'use strict'

const jwt = require('jsonwebtoken')
const unless = require('express-unless')

const secret = require('../config').secret
const utils = require('../utils')

const validateToken = () => {
  const validate = (req, res, next) => {
    let token = null

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization.split(' ')[1]
    }

    jwt.verify(token, secret, (err, user) => {
      if (!err) {
        Object.assign(req, {
          user: utils.cleanUser(user),
          token
        })

        return next()
      }

      return res
        .status(401)
        .json({
          message: 'No no no, what you playing at?!.'
        })
    })
  }

  validate.unless = unless

  return validate
}

module.exports = {
  validateToken
}
