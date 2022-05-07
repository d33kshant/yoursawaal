const router = require('express').Router()
const { createGroup, getGroupInfo, updateGroup, joinGroup, getGroups } = require('../controllers/group.controller')
const { authenticate, authorize } = require('../controllers/user.controller')

router.post('/create', authenticate, createGroup)
router.post('/update/:name', authenticate, updateGroup)
router.post('/join/:name', authenticate, joinGroup)
router.get('/random', authorize, getGroups)
router.get('/:name', authorize, getGroupInfo)

module.exports = router