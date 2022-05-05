const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
	author: String,
	body: String,
	ref: String,
	is_sponsored: Boolean,
	external_link: String,
	likes: [String],
	last_update: {
		type: Date,
		default: Date.now,
	},
	created_on: {
		type: Date,
		default: Date.now
	},
})
module.exports = mongoose.model('Post', postSchema)