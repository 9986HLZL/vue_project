let express = require('express')
let router = express.Router()
let user = require('./API/user')
let list = require('./API/list')
let register = require('./API/register')
let tasklist = require('./API/tasklist')

router.get('/user/get',user.get)
router.get('/user/userGet',user.userGet)
router.get('/register/get',register.get)

router.get('/tasklist/get',tasklist.get)
router.get('/tasklist/del',tasklist.del)
router.get('/tasklist/add',tasklist.add)
router.get('/tasklist/update',tasklist.update)
router.get('/tasklist/waitingTaskGet',tasklist.waitingTaskGet)
router.get('/tasklist/acceptableTaskGet',tasklist.acceptableTaskGet)
router.get('/tasklist/sendOrder',tasklist.sendOrder)
router.get('/tasklist/acceptOrder',tasklist.acceptOrder)

router.get('/list/all',list.all)
router.post('/list/page',list.page)
router.get('/list/get',list.get)
router.get('/list/add',list.add)
router.get('/list/update',list.update)
router.get('/list/del',list.del)

module.exports = router