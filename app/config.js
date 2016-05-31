'use strict'

const secret = new Buffer(process.env.SECRET || 'secret', 'base64')
const users = JSON.parse(process.env.USERS) || []

module.exports = {
  secret,
  users
}
