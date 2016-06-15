import jwt from 'jsonwebtoken'
import unless from 'express-unless'
import omit from 'lodash/omit'

import { secret } from '../config'

export default {
  validateToken () {
    const validate = (req, res, next) => {
      let token = null

      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1]
      }

      jwt.verify(token, secret, (err, user) => {
        if (!err) {
          Object.assign(req, {
            user: omit(user, ['iat', 'exp']),
            token: (user.exp - (Date.now() * 0.001) < 60 * 60 * 12)
              ? jwt.sign(omit(user, ['iat', 'exp']), secret, { expiresIn: 60 * 60 * 24 })
              : token
          })

          return next()
        }

        return res
          .status(401)
          .json({
            error: {
              message: 'No no no, what you playing at?!.'
            }
          })
      })
    }

    validate.unless = unless

    return validate
  }
}
