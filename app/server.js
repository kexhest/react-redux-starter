import path from 'path'
import http from 'http'
import express from 'express'
import compression from 'compression'
import logger from 'morgan'

import v1 from './routes'

const port = process.env.PORT || 3000
const root = path.join(__dirname, './../public')
const logLevel = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
const dev = process.env.NODE_ENV === 'development'

const app = express()
const server = http.createServer(app)

app.use(compression())
app.use(logger(logLevel))

app.use('/v1', v1)

if (dev) {
  require('./server.dev')(app, root)
} else {
  require('./server.prod')(app, root)
}

server.listen(port, (err) => {
  if (err) console.log(err)

  console.info('==> 🌎  Listening on port %s', port)
})
