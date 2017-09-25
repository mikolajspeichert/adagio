/* eslint consistent-return:0 */

const express = require('express')
const logger = require('./logger')
const path = require('path')

const argv = require('minimist')(process.argv.slice(2))

const app = express()

// Dev middleware
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.dev.js')

const compiler = webpack(webpackConfig)
const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  silent: true,
  stats: 'errors-only',
})

app.use(middleware)
app.use(webpackHotMiddleware(compiler))

// Since webpackDevMiddleware uses memory-fs internally to store build
// artifacts, we use it instead
const fs = middleware.fileSystem
app.get('*', (req, res) => {
  fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404)
    } else {
      res.send(file.toString())
    }
  })
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'

const port = argv.port || process.env.PORT || 3001

// Start your app.
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message)
  }

  logger.appStarted(port, prettyHost)
})
