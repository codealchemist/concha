'use strict'

const expect = require('chai').expect
const io = require('socket.io-client')
const stdin = require('mock-stdin').stdin()
const config = require('../src/config')
const socketUrl = `${config.serverUrl}:${config.serverPort}`

// start concha
const concha = require('../src/index')(stdin)

describe('concha', () => {
  let socket

  beforeEach(() => {
    socket = io.connect(socketUrl)
  })

  afterEach(() => {
    socket.disconnect()
  })

  it('should start socket', (done) => {
    socket.on('connect', () => {
      done()
    })
  })

  it('should get plugins to load', (done) => {
    socket.on('plugins', (data) => {
      expect(data).to.eql(['deezer'])
      done()
    })
  })

  it('should send commands using stdin', (done) => {
    socket.on('connect', () => {
      // send command
      stdin.send('test()\n', 'ascii')
    })

    socket.on('command', (command) => {
      expect(command).to.eql('test()')
      done()
    })
  })

  it('should send commands using socket', (done) => {
    socket.on('connect', () => {
      // send command
      concha.io.sockets.emit('command', 'test()')
    })

    socket.on('command', (command) => {
      expect(command).to.eql('test()')
      done()
    })
  })

  it('should expose app', () => {
    expect(concha.app).to.not.be.undefined
  })

  it('should expose io', () => {
    expect(concha.io).to.not.be.undefined
  })

  it('should expose readline', () => {
    expect(concha.readline).to.not.be.undefined
  })

  it('should expose http', () => {
    expect(concha.http).to.not.be.undefined
  })
})
