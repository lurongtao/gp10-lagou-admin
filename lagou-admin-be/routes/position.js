var express = require('express')
var router = express.Router()

const positionController = require('../constrollers/position')
const oAuth = require('../middlewares/oAuth')

router.route('/')
  .all(oAuth)
  .get(positionController.find)

module.exports = router