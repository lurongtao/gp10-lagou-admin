import userTpl from '../views/user.html'

class Users {
  constructor() {
    this._renderUerTpl({isSignin: false})
    this._user()
  }

  _renderUerTpl({isSignin=false}) {
    let template = Handlebars.compile(userTpl)
    let renderedUserTpl = template({
      isSignin
    })
    $('.user-menu').html(renderedUserTpl)
  }
  
  // 渲染user模板，绑定登录注册事件
  _user() {
    let that = this
    this._renderUerTpl({})
    $('#user').on('click', 'span', function(e) {
      // e.stopPropagation()
      if ($(this).attr('id') === 'user-signin') {
        $('.box-title').html('登录')
        that._doSign('/api/users/signin')
      } else {
        $('.box-title').html('注册')
        that._doSign('/api/users/signup')
      }
    })
  }

  // 登录注册ajax
  _doSign(url) {
    $('#confirm').off('click').on('click', async () => {
      $.ajax({
        url,
        type: 'POST',
        data: $('#user-form').serialize(),
        success(result) {
          // todo
          alert(result.data.message)
        }
      })
    })
  }
}

export default Users