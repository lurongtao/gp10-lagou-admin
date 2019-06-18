const db = require('../utils/db')

const userModel = {
  _init() {
    this.UserModel = db.model('users', {
      username: String,
      password: String
    })
  },

  // 数据存储
  save(data) {
    // 实例化model, 同时传入要插入的数据
    const users = new this.UserModel(data)
    // 执行插入操作
    return users.save()
  },

  // 查询单个用户数据
  findOne(username) {
    return this.UserModel.findOne({username})
  }
}

// 初始化
userModel._init()

module.exports = userModel