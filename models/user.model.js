const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
	name: String,
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
	avatar: {
		type: String,
		default: 'avatar.png'
	},
	banner: {
		type: String,
		default: 'banner.png'
	},
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