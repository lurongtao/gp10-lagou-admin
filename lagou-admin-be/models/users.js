const db = require('../utils/db')

class UserModel {
  constructor() {
    this.userModel = db.model('users', {
      username: String,
      password: String
    })
  }

  insert(data) {
    let users = new this.userModel(data)
    return users.save()
  }

  select(data) {
    return this.userModel.findOne({username: data.username})
  }
}

module.exports = new UserModel()