import path from 'path'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

module.exports = function (app, root) {
  const compiler = webpack(webpackConfig)

  const devMiddleware = webpackDevMiddleware(compiler, {
    // noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })

  app.use(devMiddleware)
  app.use(webpackHotMiddleware(compiler))

  app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html')) {
      res.write(devMiddleware.fileSystem.readFileSync(path.join(root, 'index.html')))
      res.end()
    } else {
      next()
    }
  })
}
