const router = require('express').Router()
const passport = require('passport')
const { signupUser, loginUser, updateUser } = require('../controllers/user.controller')

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/update/:id', updateUser)

router.get('/login/facebook', passport.authenticate('facebook', { scope: 'email' }))
router.get('/callback/facebook', passport.authenticate('facebook', {
	successRedirect: '/api/user/success/facebook',
	failureRedirect: '/api/user/failed/facebook'
}))

router.get('/failed/facebook', (req, res)=>res.json({ error: 'Failed to authenticate' }))
router.get('/failed/google', (req, res)=>res.json({ error: 'Failed to authenticate' }))

router.get('/success/facebook', (req, res)=>res.json({ message: "Logged in" }))

module.exports = router