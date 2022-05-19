const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')
const Post = require('../models/post.model')
const Group = require('../models/group.model')

const loginAdmin = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.json({
			error: "Required fields can not be empty."
		})
	}

	try {
		const user = await User.findOne({ email })
		if (user) {
			if (user.is_admin) {
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
						error: "Invalid username or password."
					})	
				}
			} else {
				res.json({
					error: "You are not an admin"
				})
			}
		} else {
			res.json({
				error: "Invalid username or password."
			})
		}
	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const getUsers = async (req, res) => {
	const { page } = req.query
	const USER_PER_PAGE = 10
	const offset = ((Math.max(page, 1) - 1) * USER_PER_PAGE)

	try {
		const totalUsers = await User.find({}).count()
		const users = await User.find({}).skip(offset).limit(USER_PER_PAGE)
		for (const user of users) {
			delete user._doc.password
		}
		res.json({
			total_page: Math.ceil(totalUsers/USER_PER_PAGE),
			total_items: totalUsers,
			current: `${offset+1}-${offset+users.length}`,
			users
		})
	} catch(error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const getPosts = async (req, res) => {
	const page = Number(req.query.page) || 1
	const POST_PER_PAGE = 10
	const offset = ((Math.max(page, 1) - 1) * POST_PER_PAGE)

	try {
		const totalPosts = await Post.find({}).count()
		const posts = await Post.find({}).skip(offset).limit(POST_PER_PAGE)
		res.json({
			total_page: Math.ceil(totalPosts/POST_PER_PAGE),
			total_items: totalPosts,
			current: `${offset+1}-${offset+posts.length}`,
			posts
		})
	} catch(error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const getGroups = async (req, res) => {
	const page = Number(req.query.page) || 1
	const GROUP_PER_PAGE = 10
	const offset = ((Math.max(page, 1) - 1) * GROUP_PER_PAGE)
	try {
		const totalGroups = await Group.find({}).count()
		const groups = await Group.find({}).skip(offset).limit(GROUP_PER_PAGE)
		res.json({
			total_page: Math.ceil(totalGroups/GROUP_PER_PAGE),
			total_items: totalGroups,
			current: `${offset+1}-${offset+groups.length}`,
			groups
		})
	} catch(error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const isAdmin = async (req, res, next) => {
	const uid = req.user.uid
	User.findById(uid, (error, doc) => {
		if (error) {
			return res.json({
				error: "Semething went wrong"
			})
		}
		if (doc.is_admin) {
			next()
		} else {
			res.json({
				error: "Operation not permited."
			})
		}
	})
}

const getUserById = async (req, res) => {
	const { id: user_id } = req.params
	try {
		const user = await User.findById(user_id)
		if (user) {
			delete user._doc.password
			res.json(user)
		} else {
			res.json({
				error: "User not found."
			})
		}
	} catch(error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const getPostById = async (req, res) => {
	const { id: post_id } = req.params
	try {
		const post = await Post.findById(post_id)
		post ? res.json(post) : res.json({ error: "Post not found." })
	} catch(error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const getGroupById = async (req, res) => {
	const { id: groups_id } = req.params
	try {
		const group = await Group.findById(groups_id)
		group ? res.json(group) : res.json({ error: "Group not found." })
	} catch(error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const updateUser = async (req, res) => {
	const { id: user_id } = req.params
	try {
		const user = await User.findById(user_id)
		if (user) {
			// TODO: Update user from req.body
		} else {
			res.json({
				error: "User not found."
			})
		}
	} catch(error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

module.exports = {
	isAdmin,
	loginAdmin,
	getUsers,
	getPosts,
	getGroups,
	getUserById,
	getGroupById,
	getPostById,
	updateUser,
}