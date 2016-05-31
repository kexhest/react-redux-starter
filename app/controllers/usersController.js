'use strict'

// const users = require('../models/users')
const auth = require('../models/auth')

const me = (req, res) => {
  res.status(200).json({
    token: auth.createToken(req.user),
    user: req.user
  })
}

module.exports = {
  me
}
