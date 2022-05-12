const User = require('../models/user.model')

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

			} else {
				res.json({
					error: "You are not an admin"
				})
			}
		} else {
			res.json({
				error: "User not found."
			})
		}
	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const isAdmin = (req, res, next) => {
	const uid = req.user.uid
	const user = await User.findById(uid)
	(user?.is_admin) ? next() : res.json({ error: "Operation not permitted." })
}

module.exports = {
	isAdmin,
	loginAdmin,
}