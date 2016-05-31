'use strict'

const users = require('../models/users')
const auth = require('../models/auth')

const create = (req, res) => {
  const user = users.findBy('password', req.body.password)

  if (user) {
    res.status(201).json({
      token: auth.createToken(user),
      user
    })
  } else {
    res.status(401).json({error: {message: 'Nope!'}})
  }
}

const destroy = (req, res) => {
  res.status(200).json({
    message: 'success'
  })
}

module.exports = {
  create,
  destroy
}
