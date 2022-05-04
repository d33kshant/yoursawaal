const createPost = (req, res) => {
	// TODO: Create post from req.body, Required authentication
}

const likePost = (req, res) => {
	// TODO: Like post, Required authentication and post id
}

const getFeedPosts = (req, res) => {
	// TODO: Get posts related to current user if exist, Required authorization if user exist
}

const updatePost = (req, res) => {
	// TODO: Update post from req.boyd, Required authentication and post id
}

module.exports = {
	createPost,
	updatePost,
	likePost,
	getFeedPosts
}