var express = require('express')
var router = express.Router()

const positionController = require('../constrollers/position')
const oAuthBase = require('../middlewares/oAuth-base')

router.route('/')
  .all(oAuthBase)
  .get(positionController.findAll)
  .post(positionController.save)

module.exports = router