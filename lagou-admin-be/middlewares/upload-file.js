const multer = require('multer') // 处理接受 multipart/form-data
const path = require('path')
const randomString = require('node-random-string')

class FileUpload {
  _fileFilter(req, file, cb) {
    let mimeRegexp = new RegExp('(image\/png|image\/jpg|image\/jpeg|image\/gif)', 'gi')
    if (mimeRegexp.test(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
      cb(new Error('文件格式不正确'))
    }
  }

  uploadFile(req, res, next) {
    let filename = ''

    // storeage 定义文件存储信息
    let storage = multer.diskStorage({
      // 目标文件夹位置
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/upload'))
      },

      // 目标文件名
      filename: (req, file, cb) => {
        let fileOriName = file.originalname
        let lastDot = fileOriName.lastIndexOf('.')
        let extFilename = fileOriName.slice(lastDot)

        let rs = randomString({
          length: 10,
          lowerCase: true
        });

        filename = rs + extFilename
        cb(null, filename)
      }
    })

    var upload = multer({
      storage,
      limits: {
        fileSize: 1024 * 1024
      },
      fileFilter: fileUpload._fileFilter
    }).single('companyLogo')

    upload(req, res, (err) => {
      if (err) {
        res.render('fail', {
          data: JSON.stringify(err.message)
        })
      } else {
        // 传递filename 到下个中间件
        req.filename = filename
        next()
      }
    })
  }
}

const fileUpload = new FileUpload()

module.exports = fileUpload