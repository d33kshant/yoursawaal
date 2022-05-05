const router = require('express').Router()
const { createPost, updatePost, getFeedPosts, deletePost, getUserPosts, likePost } = require('../controllers/post.controller')
const { authenticate, authorize } = require('../controllers/user.controller')

router.post('/create', authenticate, createPost)
router.post('/update/:id', authenticate, updatePost)
router.post('/delete/:id', authenticate, deletePost)
router.post('/like/:id', authenticate, likePost)
router.get('/user/:id', authorize, getUserPosts)
router.get('/', authorize, getFeedPosts)

module.exports = router