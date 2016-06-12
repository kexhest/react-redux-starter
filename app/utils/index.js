import jwt from 'jsonwebtoken'

import { secret } from '../config'

export const cleanUser = user => ({
  id: user.id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName
})

export const createToken = user =>
  jwt.sign(user, secret, { expiresIn: 60 * 60 * 5 })
