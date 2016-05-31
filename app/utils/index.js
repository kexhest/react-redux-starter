'use strict'

const cleanUser = user => ({
  id: user.id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName
})

module.exports = {
  cleanUser
}
