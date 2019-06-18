import menuTpl from '../views/menu.html'
import homeTpl from '../views/home.hbs'

import Users from './users'

export const render = (req, res, next) => {
  // 转载menu
  $('.sidebar-menu').html(menuTpl)

  // 渲染登录注册
  new Users()

  // 返回路由的home页
  res.render(homeTpl({}))
}