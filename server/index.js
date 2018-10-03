/* eslint consistent-return:0 */

const { join } = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const logger = require('./logger')
const port = require('./port')

const app = express()

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

const webpackConfig = require('./webpack/webpack.config')

const compiler = webpack(webpackConfig)
const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  silent: true,
  stats: 'errors-only',
})
app.use(middleware)
app.use(webpackHotMiddleware(compiler))

const fs = middleware.fileSystem
app.get('*', (req, res) => {
  fs.readFile(join(compiler.outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404)
    } else {
      res.send(file.toString())
    }
  })
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'

// Start your app.
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message)
  }
  logger.appStarted(port, prettyHost)
})
