'use strict'

const users = require('../config').users
const utils = require('../utils')

const all = () => users

const find = id =>
  utils.cleanUser(users.find(usr => usr.id === id))

const findBy = (key, value) =>
  utils.cleanUser(users.find(usr => usr[key] === value))

module.exports = {
  all,
  find,
  findBy
}
