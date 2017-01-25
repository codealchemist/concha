#!/usr/bin/env node
'use strict'

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const readline = require('readline')
const routes = require('./routes')
const path = require('path')
const config = require('./config')
const completer = require('./completer')
const ip = require('ip')

module.exports = function (input = process.stdin, output = process.stdout) {
  // set routes
  routes(app)

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
  io.on('connection', function (socket) {
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
  const localIp = ip.address()
  http.listen(config.serverPort, function () {
    console.log(`
      LOCAL ACCESS
      - listening on http://localhost:${config.serverPort}
      - install http://localhost:${config.serverPort}/install

      LAN ACCESS
      - listening on http://${localIp}:${config.serverPort}
      - install http://${localIp}:${config.serverPort}/install
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
