const router = require('express').Router()
const { createGroup, getGroupInfo, updateGroup } = require('../controllers/group.controller')
const { authenticate, authorize } = require('../controllers/user.controller')

router.post('/create', authenticate, createGroup)
router.post('/update/:name', authenticate, updateGroup)
router.get('/:name', authorize, getGroupInfo)

module.exports = router