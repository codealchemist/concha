#!/usr/bin/env node
'use strict'

const app = require('express')()
const ejs = require('ejs')
const http = require('http').Server(app)
const https = require('https')
const io = require('socket.io')
const readline = require('readline')
const routes = require('./routes')
const path = require('path')
const config = require('./config')
const completer = require('./completer')
const ip = require('ip')
const fs = require('fs')

module.exports = function (input = process.stdin, output = process.stdout) {
  app.set('view engine', 'js')
  app.engine('js', ejs.renderFile)
  app.set('views', __dirname)

  // load ssl creds
  const privateKey = fs.readFileSync('cert/concha.key', 'utf8')
  const certificate = fs.readFileSync('cert/concha.crt', 'utf8')
  const credentials = {key: privateKey, cert: certificate}

  // init https server
  const httpsServer = https.createServer(credentials, app)

  const localIp = ip.address()
  const host = `${localIp}:${config.serverPort}`

  // set routes
  routes(app, host)

  // let plugins define their own commands for auto complete
  loadPluginsAutocomplete()

  // set command line interface
  const rl = readline.createInterface({
    input: input,
    output: output,
    prompt: 'concha> ',
    completer: completer.get()
  })

  rl.on('close', () => {
    rl.clearLine()
    console.log('Have a great day!')
    rl.clearLine()
    process.exit(0)
  })

  // setup socket
  io.listen(httpsServer)
    .on('connection', function (socket) {
      rl.clearLine()
      console.log('- browser connected')
      rl.clearLine()
      rl.prompt()

      // print responses
      socket.on('response', (response) => {
        console.log(response)
        rl.prompt()
      })

      // send every received line thru the socket as a command
      rl.on('line', (command) => {
        socket.emit('command', command)
      })

      // make client load plugins
      if (config.plugins) {
        socket.emit('plugins', config.plugins)
      }
    })

  // start server
  httpsServer.listen(config.serverPort, function () {
    console.log(`
      LOCAL ACCESS
      - listening on https://localhost:${config.serverPort}
      - install https://localhost:${config.serverPort}/install

      LAN ACCESS
      - listening on https://${host}
      - install https://${host}/install
    `)
  })

  function loadPluginsAutocomplete () {
    if (config.plugins) {
      // load autocompletions for each plugin
      config.plugins.map((plugin) => {
        try {
          const completions = require(path.join(__dirname, `/plugins/${plugin}.autocomplete.js`))
          if (completions && Array.isArray(completions)) {
            completer.add(completions)
          }
        } catch (e) {}
      })
    }
  }

  // interface
  return {
    app: app,
    io: io,
    readline: rl,
    http: http
  }
}
