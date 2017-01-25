'use strict'
const path = require('path')

module.exports = function (app, host) {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'test.html'))
  })

  app.get('/install', function (req, res) {
    res.sendFile(path.join(__dirname, 'install.html'))
  })

  app.get('/inject', function (req, res) {
    const file = path.join(__dirname, 'inject')
    res.render(file, {host: host})
  })

  app.get('/plugin/:pluginName', function (req, res) {
    const pluginName = req.params.pluginName
    res.sendFile(path.join(__dirname, `/plugins/${pluginName}.js`))
  })
}
