'use strict'

class Completer {
  constructor () {
    this.completions = [
      'concha.log()',
      'concha.test()',
      'concha.plugins'
    ]
  }

  add (completions) {
    this.completions = this.completions.concat(completions)
  }

  get () {
    return (line) => {
      const hits = this.completions.filter((c) => { return c.indexOf(line) === 0 })

      // show all completions if none found
      return [hits.length ? hits : this.completions, line]
    }
  }
}

module.exports = new Completer()
