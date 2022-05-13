const router = require('express').Router()
const { authenticate } = require('../controllers/user.controller')
const { loginAdmin, getUsers, isAdmin, getPosts } = require('../controllers/admin.controller')

router.post('/login', loginAdmin)

router.get('/get/users', authenticate, isAdmin, getUsers)
router.get('/get/posts', authenticate, isAdmin, getPosts)

module.exports = router