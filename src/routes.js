'use strict'
const path = require('path')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'test.html'))
  })

  app.get('/install', function (req, res) {
    res.sendFile(path.join(__dirname, 'install.html'))
  })

  app.get('/inject', function (req, res) {
    res.sendFile(path.join(__dirname, 'inject.js'))
  })

  app.get('/plugin/:pluginName', function (req, res) {
    const pluginName = req.params.pluginName
    res.sendFile(path.join(__dirname, `/plugins/${pluginName}.js`))
  })
}
