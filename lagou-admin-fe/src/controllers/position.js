import positionTpl from '../views/position-list.hbs'
import positionAddTpl from '../views/position-add.hbs'
import positionUpdateTpl from '../views/position-update.hbs'
import oAuth from '../utils/oAuth'
import randomstring from 'randomstring'

export const render = async (req, res, next) => {
  let result = await oAuth()
  if (result.data.isSignin) {
    $.ajax({
      url: '/api/position',
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        res.render(positionTpl({
          data: result.data,
          hasResult: result.data.length > 0
        }))
      }
    })
    bindPositionListEvent(res)
  } else {
    res.go('/')
  }
}

export const add = (req, res, next) => {
  res.render(positionAddTpl({}))
  bindPositionAddEvent(res)
}

export const update = (req, res, next) => {
  $.ajax({
    url: '/api/position/one',
    data: {
      id: req.params.id
    },
    headers: {
      'X-Access-Token': localStorage.getItem('token')
    },
    success(result) {
      if (result.ret) {
        res.render(positionUpdateTpl({
          ...result.data
        }))
      } else {
        alert(result.data)
      }
    }
  })

  bindPositionUpdateEvent(req, res)
}

function bindPositionListEvent(res) {
  $('#router-view').off('click', '#addbtn').on('click', '#addbtn', (e) => {
    res.go('/position_add')
  })
  $('#router-view').off('click', '.btn-delete').on('click', '.btn-delete', function(e) {
    $.ajax({
      url: '/api/position',
      type: 'DELETE',
      data: {
        id: $(this).closest('tr').attr('data-id')
      },
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        if (result.ret) {
          res.go('/position/' + randomstring.generate(7))
        } else {
          alert(result.data)
        }
      }
    })
  })
  $('#router-view').off('click', '.btn-update').on('click', '.btn-update', function(e) {
    res.go('/position_update/' + $(this).closest('tr').attr('data-id'))
  })
}

function bindPositionUpdateEvent(req, res) {
  $('#router-view').off('click', '#posback').on('click', '#posback', (e) => {
    res.back()
  })

  $('#router-view').off('click', '#possubmit').on('click', '#possubmit', (e) => {
    $('#posupdate').ajaxSubmit({
      resetForm: true,
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        if (result.ret) {
          res.back()
        } else {
          alert(result.data)
        }
      }
    })
    // $.ajax({
    //   // resetForm: true,
    //   type: 'PATCH',
    //   data: $('#posupdate').serialize(),
    //   headers: {
    //     'X-Access-Token': localStorage.getItem('token')
    //   },
    //   success(result) {
    //     if (result.ret) {
    //       res.back()
    //     } else {
    //       alert(result.data)
    //     }
    //   }
    // })
  })
}

function bindPositionAddEvent(res) {
  $('#posback').off('click').on('click', (e) => {
    res.back()
  })

  $('#possubmit').off('click').on('click', (e) => {
    $('#possave').ajaxSubmit({
      resetForm: true,
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        if (result.ret) {
          res.back()
        } else {
          alert(result.data)
        }
      }
    })
  })
}