const router = require('express').Router()
const { authenticate } = require('../controllers/user.controller')
const { loginAdmin, getUsers, isAdmin, getPosts, getGroups } = require('../controllers/admin.controller')

router.post('/login', loginAdmin)

router.get('/get/users', authenticate, isAdmin, getUsers)
router.get('/get/posts', authenticate, isAdmin, getPosts)
router.get('/get/groups', authenticate, isAdmin, getGroups)

module.exports = router