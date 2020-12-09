const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt-nodejs')

const models = require('../models')

router.post('/register', (req, res) => {
  const { login, password, passwordConfirm } = req.body
  if (!login || !password || !passwordConfirm) {
    const fields = []
    if (!login) {
      fields.push('login')
    }
    if (!password) {
      fields.push('password')
    }

    if (!passwordConfirm) {
      fields.push('passwordConfirm')
    }

    res.json({
      ok: false,
      error: 'Все поля должни бить заполнени!!',
      fields,
    })
  } else if (!/^[a-zA-Z0-9]+$/.test(login)) {
    res.json({
      ok: false,
      error: 'Использовать только латинськие символи!!',
      fields: ['login'],
    })
  } else if (login.length < 3 || login.length > 12) {
    res.json({
      ok: false,
      error: 'Длина должна бить от 3 до 12 символов!!',
      fields: ['login', 'password', 'passwordConfirm'],
    })
  } else if (password !== passwordConfirm) {
    res.json({
      ok: false,
      error: 'Пароли должни совпадать!!',
      fields: ['password', 'passwordConfirm'],
    })
  } else {
    models.User.findOne({ login }, (err, user) => {
      if (user) {
        res.json({
          ok: false,
          error: 'Виберите другой логин!!',
          fields: ['login'],
        })
      } else {
        bcrypt.hash(password, null, null, function (err, hash) {
          models.User.create({
            login,
            password: hash,
          })
            .then((user) => {
              console.log(user)
              res.json({
                ok: true,
              })
            })
            .catch((err) => {
              console.log(err)
              res.json({
                ok: false,
                error: 'Ошибка! Попоробуйте позже!!',
              })
            })
        })
      }
    })
  }
})

module.exports = router
