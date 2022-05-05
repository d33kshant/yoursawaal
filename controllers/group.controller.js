const Group = require('../models/group.model')

const createGroup = async (req, res) => {
	const user = req.user
	const group_name = req.body.group_name
	const group_icon = req.body.group_icon || 'group_icon.png'

	if (!group_name) {
		return res.json({
			error: "Group name is required."
		})
	}

	try {
		
		const _group = await Group.findOne({ group_name })
		if (_group) {
			return res.json({
				error: "Group already exist. Try a different name."
			})
		}

		const group = new Group({
			group_name,
			group_icon,
			admin: user.uid,
			members: [user.uid],
			moderators: [user.uid],
		})
		await group.save()
		res.json({
			message: "Group has been created.",
		})
	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const getGroupInfo = async (req, res) => {
	const { name: group_name } = req.params
	const user_id = req.user?.uid

	try {
		const group = await Group.findOne({ group_name }, { __v: 0 })
		if (group) {
			res.json({
				...group._doc,
				members: group.members.length,
				joined: (group.members.indexOf(user_id) !== -1)
			})
		} else {
			res.json({
				error: "Group not found."
			})
		}
	} catch(error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const updateGroup = async (req, res) => {
	const { name: group_name } = req.params
	const user = req.user

	const {
		group_name: new_name,
		group_icon: new_icon,
	} = req.body

	try {
		const group = await Group.findOne({ group_name })
		if (group) {
			if (group.admin === user.uid) {
				await Group.updateOne(
					{ group_name },
					{ 
						group_name: (new_name || group.group_name),
						group_icon: (new_icon || group.group_icon)
					}
				)
				res.json({
					message: "Group info updated."
				})
			} else {
				res.json({
					error: "Operation not permited"
				})
			}
		}
	} catch(error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

module.exports = {
	createGroup,
	getGroupInfo,
	updateGroup,
}