import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.use(cors())

import authMiddleware from '../middleware/authMiddleware'

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

import authController from '../controllers/authController'
router.post('/auth', authController.create)
router.delete('/auth', authController.destroy)

import usersController from '../controllers/usersController'
router.get('/users/me', usersController.me)

router.use((req, res) => {
  res.status(404).json({ message: 'Nothing to see here.' })
})

router.use((err, req, res) => {
  if (err) console.log(err)

  res.status(500).json({ message: 'Something broke!' })
})

module.exports = router
