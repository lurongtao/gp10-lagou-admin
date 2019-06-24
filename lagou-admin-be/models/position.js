const db = require('../utils/db')

class PositionModel {
  constructor() {
    let PositionSchema = {
      companyLogo: String,
      companyName: String,
      positionName: String,
      city: String,
      salary: String,
      createTime: String
    }
    this.positionModel = db.model('positions', PositionSchema)
  }

  // 职位信息保存
  save(data) {
    let position = new this.positionModel({
      ...data,
      createTime: '2019年6月21日'
    })

    return position.save()
  }

  // 查询所有数据
  findAll(keywords) {
    let regExp = new RegExp(keywords, "i")
    return this.positionModel.find({}).sort({_id: -1})
      .or([{ companyName: regExp }, { positionName: regExp }])
  }

  // 查询单条数据
  findOne(id) {
    return this.positionModel.findById(id)
  }

  // 查询部分数据
  findMany({page, pagesize, keywords}) {
    let regExp = new RegExp(keywords, "i")
    return this.positionModel.find({}).skip(page * pagesize).limit(pagesize).sort({_id: -1})
      .or([{ companyName: regExp }, { positionName: regExp }])
  }

  // 删除数据
  delete(id) {
    return this.positionModel.findByIdAndRemove(id)
  }

  // 更新数据
  update(id, update) {
    return this.positionModel.findByIdAndUpdate(id, update)
  }
}

const positionModel = new PositionModel()

module.exports = positionModel