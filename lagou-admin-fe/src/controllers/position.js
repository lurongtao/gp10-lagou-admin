import positionTpl from '../views/position.hbs'

export const render = (req, res, next) => {
  res.render(positionTpl({}))
}