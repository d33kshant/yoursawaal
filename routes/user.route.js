const router = require('express').Router()
const { signupUser, loginUser, updateUser } = require('../controllers/user.controller')

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/update/:id', updateUser)

module.exports = router