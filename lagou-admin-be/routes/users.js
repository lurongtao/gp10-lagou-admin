var express = require('express');
var router = express.Router();

const userController = require('../constrollers/users')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)

module.exports = router
