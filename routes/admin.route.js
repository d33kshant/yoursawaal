const router = require('express').Router()
const { authenticate } = require('../controllers/user.controller')
const { loginAdmin, getUsers, isAdmin, getPosts, getGroups, getUserById, getPostById, getGroupById } = require('../controllers/admin.controller')

router.post('/login', loginAdmin)

router.get('/get/users', authenticate, isAdmin, getUsers)
router.get('/get/posts', authenticate, isAdmin, getPosts)
router.get('/get/groups', authenticate, isAdmin, getGroups)

router.get('/get/users/:id', authenticate, isAdmin, getUserById)
router.get('/get/posts/:id', authenticate, isAdmin, getPostById)
router.get('/get/groups/:id', authenticate, isAdmin, getGroupById)

module.exports = router