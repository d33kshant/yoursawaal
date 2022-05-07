// Import Post Model
const Post = require('../models/post.model')

// Create a new post with required fields
const createPost = async (req, res) => {
	
	// Get required fields from request
	const user = req.user
	const body = req.body.body
	const ref = req.body.ref || null
	const external_link = req.body.external_link
	
	const likes = []
	
	// For later admin use
	const is_sponsored = false

	// Check if post body provided in request body
	if (!body) {
		return res.json({
			error: "Post must have a body."
		})
	}

	try {
		// Create a new post from given data and save it in the databaes, Return new post as response
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
		// Something went wrong with server, Use `error` as payload if required
		res.json({
			error: "Something went wrong.",
			payload: error
		})
	}
}

// Like a post from post_id, Required authentication
const likePost = async (req, res) => {

	// Get required fields from request
	const user_id = req.user.uid
	const { id: post_id } = req.params

	// Post id is required to like a post
	if (!post_id) {
		return res.json({
			error: "Missing post id in params"
		})
	}

	try {
		// Get post info from database with post_id
		const post = await Post.findById(post_id)
		if (post) {

			// Add current user to posts likes if not exist, save the updated post
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
		// Something went wrong with server, Use `error` as payload if required
		res.json({
			error: "Something went wrong.",
			payload: error
		})
	}
}

// Get posts from users timeline
const getUserPosts = async (req, res) => {
	
	// Get required field from request
	const { id: user_id } = req.params
	const { page } = req.query || 1

	const POST_PER_PAGE = 10

	// Calculate offset based on page number
	const offset = ((Math.max(page, 1) - 1) * POST_PER_PAGE)

	try {
		// Get Post and Post count from database and return as response
		const total = await Post.find({ author: user_id }).count()
		const posts = await Post.find({ author: user_id }).skip(offset).limit(POST_PER_PAGE)
		res.json({
			total_page: Math.ceil(total / POST_PER_PAGE),
			posts: posts.map(post=>({ ...post._doc, likes: post.likes.length }))
		})
	} catch (error) {
		// Something went wrong with server, Use `error` as payload if required
		res.json({
			error: "Something went wrong."
		})
	}
}

// Update the post, Required authentication
const updatePost = async (req, res) => {
	// Get required fields from request
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
		// Get Post from database and update post
		const post = await Post.findById(post_id)
		// Check if user is author of the post
		if (post.author === user.uid) {
			// Create filter to get post by its id
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

// Delete the post, Required authentication
const deletePost = async (req, res) => {
	// Get required fields from request
	const { id: post_id } = req.params
	const { uid: user_id } = req.user

	try {
		// Find the post and delete if current user is the author
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

// Get information about likes of any post
const getLikes = async (req, res) => {
	// Get required fields from request
	const { id: post_id } = req.params
	const user_id = req.user?.uid
	try {
		// Find post by id and calculate likes
		const post = await Post.findById(post_id)
		res.json({
			likes: post.likes.length,
			likeked: post.likes.indexOf(user_id) !== -1
		})
	} catch(error) {
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
	getLikes
}