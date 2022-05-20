require('dotenv').config()
const express = require('express')
const cookieparser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('./models/user.model')

// Routes
const userRoute = require('./routes/user.route')
const groupRoute = require('./routes/group.route')
const postRoute = require('./routes/post.route')
const adminRoute = require('./routes/admin.route')

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(session({
	secret: process.env.SECRET
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new FacebookStrategy(
	{
		clientID: process.env.FB_CLIENT_ID,
		clientSecret: process.env.FB_CLIENT_SECRET,
		callbackURL: '/api/user/callback/facebook',
		profileFields: [ 'id', 'displayName', 'gender', 'email', 'picture.type(large)' ]
	},
	async (token, refreshToken, profile, done) => {
		try {
			const email = profile.emails[0].value
			const user = await User.findOne({ email })
			if (user) {
				done(null, user)
			} else {
				const newUser = new User({
					name: profile.displayName,
					email: email,
					gender: profile.gender,
					birthday: profile.birthday,
					avatar: profile.photos[0].value
				})
				await newUser.save()
				done(null, user)
			}
		} catch(error) {
			done(error)
		}
	}
))

passport.use(new GoogleStrategy(
	{
		clientID: process.env.GGL_CLIENT_ID,
		clientSecret: process.env.GGL_CLIENT_SECRET,
		callbackURL: '/api/user/callback/google',
		passReqToCallback: true,
		profileFields: [ 'id', 'displayName', 'gender', 'email', 'picture.type(large)' ]
	},
	async (request, token, refreshToken, profile, done) => {
		const { email, picture: avatar } = profile
		try {
			const user = await User.findOne({ email })
			if (user) {
				done(null, user)
			} else {
				const newUser = new User({
					email,
					avatar
				})
				await newUser.save()
				done(null, newUser)
			}
		} catch(error) {
			done(error)
		}
	}
))

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, {...user, uid: user._id})
})

app.use('/api/user', userRoute)
app.use('/api/group', groupRoute)
app.use('/api/post', postRoute)
app.use('/api/admin', adminRoute)

app.get('/', (req, res) => {
	res.json({
		message: "Home"
	})
})

mongoose.connect(DB_URI, error => {
	if (error) {
		console.log('Failed to connect to database.')
	} else {
		console.log('Connected to database.')
		const server = app.listen(PORT, () => {
			console.log('Server listening on port:', PORT)
		})

		const gracefulShutdown = signal => {
			process.on(signal, async () => {
				server.close()
				await mongoose.disconnect()
				console.log('Database Disconnected.')
				console.log('Server Closed:', signal)
				process.exit(0)
			})
		}

		["SIGTERM", "SIGINT"].forEach(signal => gracefulShutdown(signal))
	}
})