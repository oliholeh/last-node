$(function () {
  // toggle 11
  var flag = true
  $('.switch-button').on('click', function (e) {
    e.preventDefault()

    // reset form during switcghing form
    $('input').each(function (index) {
      $(this).val('')
    })
    $('p.error').remove()
    $('input').removeClass('error')
    //end reset
    //show switched form
    if (flag) {
      flag = false
      $('.register').show('slow')
      $('.login').hide()
    } else {
      flag = true
      $('.login').show('slow')
      $('.register').hide()
    }
  })

  // clear
  $('input').on('focus', function () {
    $('p.error').remove()
    $('input').removeClass('error')
  })

  //Hadler for registration
  $('.register-button').on('click', function (e) {
    e.preventDefault()
    var data = {
      login: $('#register-login').val(),
      password: $('#register-password').val(),
      passwordConfirm: $('#register-password-confirm').val(),
    }

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/register',
    }).done(function (data) {
      if (!data.ok) {
        $('.register h2').after('<p class="error">' + data.error + '</p>')
        if (data.fields && data.fields.length > 0) {
          data.fields.forEach(function (item) {
            $('input[name=' + item + ']').addClass('error')
          })
        }
        setTimeout(function () {
          $('p.error').remove()
        }, 3000)
      } else {
        // $('.register h2').after('<p class="success">Отлично!</p>')
        $(location).attr('href', '/')
        setTimeout(function () {
          $('p.success').remove()
        }, 3000)
      }
    })
  })

  //Hadler for autorization
  $('.login-button').on('click', function (e) {
    e.preventDefault()
    var data = {
      login: $('#login-login').val(),
      password: $('#login-password').val(),
    }

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/login',
    }).done(function (data) {
      if (!data.ok) {
        $('.login h2').after('<p class="error">' + data.error + '</p>')
        if (data.fields && data.fields.length > 0) {
          data.fields.forEach(function (item) {
            $('input[name=' + item + ']').addClass('error')
          })
        }
        setTimeout(function () {
          $('p.error').remove()
        }, 3000)
      } else {
        // $('.login h2').after('<p class="success">Отлично!</p>')
        $(location).attr('href', '/')
        setTimeout(function () {
          $('p.success').remove()
        }, 3000)
      }
    })
  })
})
