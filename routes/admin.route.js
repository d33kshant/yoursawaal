const router = require('express').Router()
const { loginAdmin } = require('../controllers/admin.controller')

router.post('/login', loginAdmin)

module.exports = router