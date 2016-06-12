import jwt from 'jsonwebtoken'
import unless from 'express-unless'

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
            user,
            token
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
