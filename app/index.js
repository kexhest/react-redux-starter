'use strict'

require('dotenv').config()

const path = require('path')
const http = require('http')
const express = require('express')
const compression = require('compression')
const logger = require('morgan')

const port = process.env.PORT || 3000
const root = path.join(__dirname, './../public')
const logLevel = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
const dev = process.env.NODE_ENV === 'development'

const app = express()
const server = http.createServer(app)
const v1 = require('./routes')

app.use(compression())
app.use(logger(logLevel))

app.use('/v1', v1)

app.use('/', express.static(root, { maxage: 31557600 }))

if (dev) {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.config')
  const compiler = webpack(config)

  const devMiddleware = webpackDevMiddleware(compiler, {
    // noInfo: true,
    publicPath: config.output.publicPath
  })

  app.use(devMiddleware)
  app.use(webpackHotMiddleware(compiler))

  app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html')) {
      res.write(devMiddleware.fileSystem.readFileSync(path.join(__dirname, './../public', 'index.html')))
      res.end()
    } else {
      next()
    }
  })
} else {
  app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html')) {
      res.header('Cache-Control', 'max-age=60, must-revalidate, private')

      res.sendFile('index.html', {root: root})
    } else {
      next()
    }
  })
}

server.listen(port, (err) => {
  if (err) console.log(err)

  console.info('==> 🌎  Listening on port %s', port)
})
