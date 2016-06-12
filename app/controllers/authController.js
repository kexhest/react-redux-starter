import users from '../models/users'
import { createToken } from '../utils'

export default {
  index () {},

  show () {},

  update () {},

  create (req, res) {
    const user = users.findBy('password', req.body.password)

    if (user) {
      res.status(201).json({
        token: createToken(user),
        user
      })
    } else {
      res.status(401).json({
        error: {
          message: 'Nope!'
        }
      })
    }
  },

  destroy (req, res) {
    res.status(200).json({
      message: 'success'
    })
  }
}
