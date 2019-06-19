class PositionController {
  constructor(){}

  find(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    res.render('succ', {data: 'ok'})
  }
}

const positionController = new PositionController()

module.exports = positionController