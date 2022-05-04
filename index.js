require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// Routes
const userRoute = require('./routes/user.route')
const groupRoute = require('./routes/group.route')
const postRoute = require('./routes/post.route')

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

const app = express()
app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/group', groupRoute)
app.use('/api/post', postRoute)

mongoose.connect(DB_URI, error=>{
	if (error) {
		console.log('Failed to connect to database.')
	} else {
		console.log('Connected to database.')
		const server = app.listen(PORT, ()=>{
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
		
		["SIGTERM", "SIGINT"].forEach(signal=>gracefulShutdown(signal))
	}
})