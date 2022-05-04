const mongoose = require('mongoose')
const groupSchma = new mongoose.Schema({
	group_name: String,
	group_icon: String,
	admin: mongoose.Types.ObjectId,
	members: mongoose.Types.ObjectId
})
module.exports = mongoose.model('Group', groupSchma)