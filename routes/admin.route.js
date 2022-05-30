const router = require('express').Router()
const { authenticate } = require('../controllers/user.controller')
const {
	loginAdmin,
	getUsers,
	isAdmin,
	getPosts,
	getGroups,
	getUserById,
	getPostById,
	getGroupById,
	getStats,
	updateUser,
	updatePost,
	updateGroup,
	deleteUser,
	deletePost,
	deleteGroup
} = require('../controllers/admin.controller')

router.post('/login', loginAdmin)

router.get('/get/stats', authenticate, isAdmin, getStats)

router.get('/users', authenticate, isAdmin, getUsers)
router.get('/posts', authenticate, isAdmin, getPosts)
router.get('/groups', authenticate, isAdmin, getGroups)

router.get('/users/:id', authenticate, isAdmin, getUserById)
router.get('/posts/:id', authenticate, isAdmin, getPostById)
router.get('/groups/:id', authenticate, isAdmin, getGroupById)

router.put('/users/:id', authenticate, isAdmin, updateUser)
router.put('/posts/:id', authenticate, isAdmin, updatePost)
router.put('/groups/:id', authenticate, isAdmin, updateGroup)

router.delete('/users/:id', authenticate, isAdmin, deleteUser)
router.delete('/posts/:id', authenticate, isAdmin, deletePost)
router.delete('/groups/:id', authenticate, isAdmin, deleteGroup)

module.exports = router