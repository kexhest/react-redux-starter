'use strict'

const users = require('../config').users
const utils = require('../utils')

const all = () => users

const find = id => {
  const user = users.find(usr => usr.id === id)

  return user && utils.cleanUser(user)
}

const findBy = (key, value) => {
  const user = users.find(usr => usr[key] === value)

  return user && utils.cleanUser(user)
}

module.exports = {
  all,
  find,
  findBy
}
