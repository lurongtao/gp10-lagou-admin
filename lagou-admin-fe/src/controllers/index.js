import menuTpl from '../views/menu.html'
import homeTpl from '../views/home.hbs'

export const render = (req, res, next) => {
  $('.sidebar-menu').html(menuTpl)

  res.render(homeTpl({}))
}