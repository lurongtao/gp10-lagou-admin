import userTpl from '../views/user.html'

class Users {
  constructor() {
    this._renderUerTpl({isSignin: false})
    this._user()
  }

  _renderUerTpl({isSignin=false, username=''}) {
    // 认证
    $.ajax({
      url: '/api/users/isSignin',
      success: (result) => {
        let template = Handlebars.compile(userTpl)
        let renderedUserTpl = template({
          isSignin: result.data.isSignin,
          username: result.data.username
        })
        $('.user-menu').html(renderedUserTpl)
      }
    })
  }
  
  // 渲染user模板，绑定登录注册事件
  _user() {
    let that = this
    this._renderUerTpl({})

    // $('.user-menu').on('click', '#signout', () => {
    //   $.ajax({
    //     url: '/api/users/signout',
    //     success: (result) => {
    //       location.reload()
    //     }
    //   })
    // })

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
        success: (result) => {
          if (type === 'signin') {
            this._signinSucc(result)
          } else {
            alert(result.data.message)
          }
        }
      })
    })
  }

  _signinSucc(result) {
    if (result.ret) {
      this._renderUerTpl({
        isSignin: true,
        username: result.data.username
      })
    }
  }
}

export default Users