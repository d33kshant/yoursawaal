const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const signupUser = async (req, res) => {
	const { email, password, full_name } = req.body
	
	if (!email || !password || !full_name) {
		return res.json({
			error: "Required fields can not be empty."
		})
	}

	try {
		const _user = await User.findOne({ email: email })
		if (_user) {
			return res.json({
				error: "Email is already registred. Try another one.",
			})
		}

		const hash = await bcrypt.hash(password, 10)
		const user = new User({
			email,
			name: full_name,
			password: hash
		})
		await user.save()
		res.json({
			message: "Signup successfully."
		})
	} catch (error) {
		res.json({
			error: "Something went wrong.",
			payload: error
		})
	}
}

const loginUser = async (req, res) => {
	const { email, password } = req.body
	
	if (!email || !password) {
		return res.json({
			error: "Required fields can not be empty."
		})
	}

	try {
		const user = await User.findOne({ email })
		if (user) {
			if (await bcrypt.compare(password, user.password)) {
				const token = jwt.sign({
					email: user.email,
					uid: user._id
				}, process.env.SECRET)
				res.cookie('token', token, { httpOnly: true });
				res.json({
					message: "Logged in successfully.",
					token
				})
			} else {
				res.json({
					error: "Invalid username or password." // Password didn't match
				})	
			}
		} else {
			res.json({
				error: "Invalid username or password." // Email didn't match
			})
		}
	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const authenticate = (req, res, next) => {
	const token = req.cookies.token
	if (token) {
		const payload = jwt.verify(token, process.env.SECRET)
		if (payload) {
			req.user = payload
			next()
		} else {
			res.json({
				error: "Authantication failed",
				login: false
			})
		}
	} else {
		res.json({
			error: "Authantication failed",
			login: false
		})
	}
}

const authorize = (req, res, next) => {
	const token = req.cookies.token
	if (token) {
		const payload = jwt.verify(token, process.env.SECRET)
		if (payload) {
			req.user = payload
		}
	}
	next()
}

module.exports = {
	signupUser,
	loginUser,
	authenticate,
	authorize
}