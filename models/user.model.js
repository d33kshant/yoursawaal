const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
	about: String,
	occupation: String,
	country: String,
	gander: String,
	birthday: Date,
	password: String,
	hobbies: String,
	interests: String,
	experience: [String],
	education: [String],
	email: {
		type: String,
		unique: true
	},
	joined: {
		type: Date,
		default: Date.now
	}
})
module.exports = mongoose.model('User', userSchema)