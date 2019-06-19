import positionTpl from '../views/position.hbs'
import oAuth from '../utils/oAuth'

export const render = async (req, res, next) => {
  let result = await oAuth()
  if (result.data.isSignin) {
    res.render(positionTpl({}))
  } else {
    res.go('/')
  }
}