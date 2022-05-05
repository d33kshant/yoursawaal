const Post = require('../models/post.model')

const createPost = async (req, res) => {
	const body = req.body.body
	const ref = req.body.ref || null
	const external_link = req.body.external_link
	const is_sponsored = false
	const likes = []
	const user = req.user

	if (!user) {
		return res.json({
			error: "Authantication failed"
		})
	}

	try {
		const post = new Post({
			body,
			ref,
			external_link,
			is_sponsored,
			likes,
			author: user.uid
		})
		await post.save()
		res.json({
			message: "Post created successfully",
			payload: post
		})
	} catch (error) {
		res.json({
			error: "Something went wrong.",
			payload: error
		})
	}
}

const likePost = async (req, res) => {
	const user_id = req.user.uid
	const { id: post_id } = req.params

	if (!post_id) {
		return res.json({
			error: "Missing post id in params"
		})
	}

	try {
		const post = await Post.findById(post_id)
		if (post) {
			if (post.likes.indexOf(user_id) !== -1) {
				post.likes = post.likes.filter(user => user !== user_id)
				await post.save()
				res.json({
					message: 'Post disliked.',
					liked: false
				})
			} else {
				post.likes.push(user_id)
				await post.save()
				res.json({
					message: "Post liked.",
					liked: true
				})
			}
		} else {
			return res.json({
				error: "Post not found.",
			})
		}
	} catch (error) {
		res.json({
			error: "Something went wrong.",
			payload: error
		})
	}
}

const getUserPosts = async (req, res) => {
	const { id: user_id } = req.params
	const { page } = req.query || 1
	const POST_PER_PAGE = 10

	const offset = ((Math.max(page, 1) - 1) * POST_PER_PAGE)

	try {
		const total = await Post.find({ author: user_id }).count()
		const posts = await Post.find({ author: user_id }).skip(offset).limit(POST_PER_PAGE)
		res.json({
			total_page: Math.ceil(total / POST_PER_PAGE),
			posts
		})
	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const getFeedPosts = (req, res) => {
	// TODO: Get posts related to current user if exist, Required authorization if user exist
}

const updatePost = async (req, res) => {
	const user = req.user
	const { id: post_id } = req.params
	const {
		body,
		external_link,
	} = req.body

	if (!post_id) {
		return res.json({
			error: "Post id missing in params"
		})
	}

	try {
		const post = await Post.findById(post_id)
		if (post.author === user.uid) {

			const filter = { _id: post_id }
			const update = {
				body,
				external_link,
				last_update: Date.now()
			}
			await Post.updateOne(filter, update)
			res.json({
				message: "Post has been updated.",
			})
		} else {
			res.json({
				error: "Operation not permited."
			})
		}
	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

const deletePost = async (req, res) => {
	const { id: post_id } = req.params
	const { uid: user_id } = req.user

	try {
		const post = await Post.findById(post_id)
		if (post) {
			if (post.author === user_id) {
				await Post.deleteOne({ _id: post_id })
				res.json({
					message: "Post deleted successfully"
				})
			} else {
				res.json({
					error: "Operation not permited."
				})
			}
		}
	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}

module.exports = {
	createPost,
	updatePost,
	likePost,
	deletePost,
	getUserPosts,
	getFeedPosts
}