'use strict'

import { users } from '../config'
import { cleanUser } from '../utils'

export default {
  all () {
    return users
  },

  find (id) {
    const user = users.find(usr => usr.id === id)

    return user && cleanUser(user)
  },

  findBy (key, value) {
    const user = users.find(usr => usr[key] === value)

    return user && cleanUser(user)
  }
}
