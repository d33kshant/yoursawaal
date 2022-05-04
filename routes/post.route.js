const router = require('express').Router()
const { createPost, updatePost, getFeedPosts } = require('../controllers/post.controller')
const { authenticate, authorize } = require('../controllers/user.controller')

router.post('/create', authenticate, createPost)
router.post('/update/:id', authenticate, updatePost)
router.get('/', authorize, getFeedPosts)

module.exports = router