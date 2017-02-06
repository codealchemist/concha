// namespace where base features and plugins will live
var concha = {plugins: {}};

(function () {
  const serverUrl = `https://<%= host %>`

  // inject socket.io
  inject(`${serverUrl}/socket.io/socket.io.js`, init)

  function inject (src, callback) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.onload = function () {
      if (typeof callback === 'function') callback()
    }
    script.src = src
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  function init () {
    var socket = io.connect(serverUrl, {secure: true})
    socket.on('connection', () => {
      console.info('concha: connection established')
    })

    socket.on('plugins', loadPlugins)

    socket.on('command', (command) => {
      var f = new Function(`return ${command}`)
      socket.emit('response', f())
    })
  }

  function loadPlugins (plugins) {
    const pluginBaseUrl = `${serverUrl}/plugin/`
    plugins.map((plugin) => {
      inject(pluginBaseUrl + plugin, () => {
        // load plugin
        try {
          concha.plugins[plugin] = new Function(`return new ${plugin}ConchaPlugin()`)()
          console.info(`concha: plugin loaded: ${plugin}`)
        } catch (e) {
          console.error(`concha: error loading plugin: ${plugin}`, e)
        }
      })
    })
  }
})()

concha.test = (params) => {
  console.info('concha: test called:', params)
  return 'ROCK!'
}

concha.log = (value) => {
  console.info(value)
  return value
}
