const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
	author: String,			// Author id
	body: String,			// Content of post
	ref: String,			// Id of reference post if any
	group: String,			// Group in which posted
	is_sponsored: Boolean,	// Post is sponsored or not, For admin use
	external_link: String,	// External link
	likes: [String],		// List of user that liked this post
	last_update: {			// Date post last updated
		type: Date,
		default: Date.now,
	},
	created_on: {			// Date post created
		type: Date,
		default: Date.now
	},
})
module.exports = mongoose.model('Post', postSchema)