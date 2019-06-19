var express = require('express');
var router = express.Router();

const userController = require('../constrollers/users')
const oAuthMiddleWare = require('../middlewares/oAuth')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/issignin', oAuthMiddleWare)

module.exports = router