'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use(cors())

const authMiddleware = require('../middleware/authMiddleware')

router.use(
  authMiddleware.validateToken()
    .unless({
      path: [
        {
          url: '/v1/auth',
          methods: ['POST', 'DELETE']
        }
      ]
    })
)

const authController = require('../controllers/authController')
router.post('/auth', authController.create)
router.delete('/auth', authController.destroy)

const usersController = require('../controllers/usersController')
router.get('/users/me', usersController.me)

router.use((req, res) => {
  res.status(404).json({ message: 'Nothing to see here.' })
})

router.use((err, req, res) => {
  if (err) console.log(err)

  res.status(500).json({ message: 'Something broke!' })
})

module.exports = router
