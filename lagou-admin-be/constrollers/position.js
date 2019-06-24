var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

let mySocket = null
io.on('connection', function (socket) {
  mySocket = socket
  mySocket.emit('message', 'send')
})

server.listen(8082, 'localhost')

const positionModel = require('../models/position')

class PositionController {
  constructor(){
    // console.log(mySocket)
  }

  async findAll(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let result = await positionModel.findAll()
    res.render('succ', {data: JSON.stringify(result)})
  }

  async findOne(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let result = await positionModel.findOne(req.query.id)
    res.render('succ', {data: JSON.stringify(result)})
  }

  async findMany(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')

    // 获取一下前端来的数据
    let { page = 0, pagesize = 10, keywords = '' } = req.query
    let result = await positionModel.findMany({
      page: ~~page, 
      pagesize: ~~pagesize,
      keywords
    })

    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          result,
          total: (await positionModel.findAll(keywords)).length
        })
      })
    }
  }

  async save(req, res, next) {
    // 从对象里删除 companyLogo 属性
    delete req.body.companyLogo
    
    let result = await positionModel.save({
      ...req.body,
      companyLogo: req.filename
    })

    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '数据保存成功.'
        })
      })
      
      mySocket.emit('message', 'send')
    }
  }

  async delete(req, res, next) {
    let result = await positionModel.delete(req.body.id)
    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '数据删除成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '数据删除失败.'
        })
      })
    }
  }

  async update(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    delete req.body.companyLogo
    req.body = req.filename ? { ...req.body, companyLogo: req.filename } : req.body
    let result = await positionModel.update(req.body.id, req.body)
    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '数据修改成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '数据修改失败.'
        })
      })
    }
  }
}

const positionController = new PositionController()

module.exports = positionController