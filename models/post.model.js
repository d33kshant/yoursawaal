const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
	author: mongoose.Types.ObjectId,
	body: String,
	ref: mongoose.Types.ObjectId,
	likes: [mongoose.Types.ObjectId],
	attachment: String,
	is_sponsored: Boolean,
	external_link: String,
	created_on: {
		type: Date,
		default: Date.now
	},
})
module.exports = mongoose.model('Post', postSchema)