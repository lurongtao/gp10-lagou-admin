import userTpl from '../views/user.html'
import oAuth from '../utils/oAuth'

class Users {
  constructor() {
    // this._renderUerTpl({isSignin: false})
    this._init()
  }

  async _init() {
    let result = await oAuth()
    if (result) {
      this._renderUerTpl({...result.data})
    } else {
      this._renderUerTpl({isSignin: false})
    }
  } 

  _renderUerTpl({isSignin=false, username=''}) {
    let template = Handlebars.compile(userTpl)
    let renderedUserTpl = template({
      isSignin,
      username
    })
    $('.user-menu').html(renderedUserTpl)
    this._user()
  }
  
  // 渲染user模板，绑定登录注册事件
  _user() {
    let that = this

    $('.user-menu').on('click', '#signout', () => {
      localStorage.removeItem('token')
      location.reload()
    })

    $('#user').on('click', 'span', function(e) {
      // e.stopPropagation()
      if ($(this).attr('id') === 'user-signin') {
        $('.box-title').html('登录')
        that._doSign('/api/users/signin', 'signin')
      } else {
        $('.box-title').html('注册')
        that._doSign('/api/users/signup', 'signup')
      }
    })
  }

  // 登录注册ajax
  _doSign(url, type) {
    $('#confirm').off('click').on('click', async () => {
      $.ajax({
        url,
        type: 'POST',
        data: $('#user-form').serialize(),
        success: (result, statusCode, jqXHR) => {
          if (type === 'signin') {
            this._signinSucc(result, jqXHR)
          } else {
            alert(result.data.message)
          }
        }
      })
    })
  }

  _signinSucc(result, jqXHR) {
    if (result.ret) {
      this._renderUerTpl({
        isSignin: true,
        username: result.data.username
      })

      // 存储token
      localStorage.setItem('token', jqXHR.getResponseHeader('X-Access-Token'))
    }
  }
}

export default Users