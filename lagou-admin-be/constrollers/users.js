const userController = {
  signup(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.render('succ', {
      data: JSON.stringify(req.body)
    })
  }
}

module.exports = userController