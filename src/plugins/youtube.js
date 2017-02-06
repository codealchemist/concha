class youtubeConchaPlugin {
  constructor () {
    // use globals
    window.yt = window.yt || {}
    window.yt.play = this.play
    window.yt.pause = this.pause
    window.yt.search = this.search
    window.yt.next = this.next
    window.yt.prev = this.prev
    window.yt.skipAd = this.skipAd
    window.yt.mute = this.mute
    window.yt.unmute = this.unmute
    window.yt.fullscreen = this.fullscreen
    window.yt.like = this.like
    window.yt.unlike = this.unlike
    window.yt.info = this.info
    window.yt.share = this.share

    // common ui elements
    this.$muteButton = document.querySelector('.ytp-mute-button')
  }

  play () {
    document.querySelector('video').play()
    return 'Playing...'
  }

  pause () {
    document.querySelector('video').pause()
    return 'Paused.'
  }

  search (terms, autoPlayIndex=0) {
    yt.window.navigate(`results?search_query=${terms}`)

    setTimeout(() => {
      document.querySelectorAll('.yt-uix-tile-link')[autoPlayIndex].click()
    }, 2000)

    return `Playing ${terms} #${autoPlayIndex}`
  }

  next () {
    document.querySelector('.ytp-next-button').click()
    return 'Next...'
  }

  prev () {
    document.querySelector('.ytp-prev-button').click()
    return 'Previous...'
  }

  skipAd () {
    document.querySelector('.videoAdUiSkipButton').click()
    return 'Ad Skipped.'
  }

  mute () {
    if (this.$muteButton.title !== 'Mute') {
      return 'Already mute.'
    }

    this.$muteButton.click()
    return 'Muted.'
  }

  unmute () {
    if (this.$muteButton.title === 'Mute') {
      return 'Already unmute.'
    }

    this.$muteButton.click()
    return 'Unmuted.'
  }

  fullscreen () {
    document.querySelector('.ytp-fullscreen-button').click()
    return 'Switched fullscreen mode.'
  }

  like () {
    document.querySelector('.like-button-renderer-like-button-unclicked').click()
    return 'Liked.'
  }

  unlike () {
    document.querySelector('.like-button-renderer-like-button-clicked').click()
    return 'Unliked.'
  }

  info () {
    const info = document.querySelector('.watch-title').innerHTML.trim()
    return `Playing: ${info}`
  }

  share () {
    return location.href
  }
}
