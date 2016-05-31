'use strict'

const jwt = require('jsonwebtoken')

const secret = require('../config').secret

const createToken = (user) =>
  jwt.sign(user, secret, { expiresIn: 60 * 60 * 5 })

module.exports = {
  createToken
}
