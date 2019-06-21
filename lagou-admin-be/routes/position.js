var express = require('express')
var router = express.Router()

const positionController = require('../constrollers/position')
const oAuthBase = require('../middlewares/oAuth-base')
const fileUpload = require('../middlewares/upload-file')

router.route('/')
  .all(oAuthBase)
  .get(positionController.findAll)
  .post(fileUpload.uploadFile, positionController.save)

module.exports = router