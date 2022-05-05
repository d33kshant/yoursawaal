const mongoose = require('mongoose')
const groupSchma = new mongoose.Schema({
	group_name: String,
	group_icon: String,
	admin: String,
	moderators: [String],
	members: [String]
})
module.exports = mongoose.model('Group', groupSchma)