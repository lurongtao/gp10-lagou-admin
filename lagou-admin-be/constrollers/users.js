const userModel = require('../models/users')
const bcrypt = require('bcrypt')

class UserController {
  _hashPassword(pwd, cb) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pwd, 10, (err, hash) => {
        resolve(hash)
      })
    })
  }

  _comparePassword() {

  }

  async signup(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')

    // 密码加密
    let password = req.body.password
    let hash = await userController._hashPassword(password)
    let result = await userModel.save({...req.body, password: hash})

    // 给前端构建json接口
    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '数据插入成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '数据插入失败.'
        })
      })
    }
  }

  async signin(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')

    let result = await userModel.findOne(req.body.username)
    // 给前端构建json接口
    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '用户登录成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '用户登录失败.'
        })
      })
    }
  }
}

const userController = new UserController()

module.exports = userController