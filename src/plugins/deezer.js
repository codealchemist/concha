class deezerConchaPlugin {
  constructor () {
    // use globals
    window.play = this.play
    window.pause = this.pause
    window.next = this.next
    window.prev = this.prev
    window.setVolume = this.setVolume
    window.mute = this.mute
    window.unmute = this.unmute
    window.repeatOff = this.repeatOff
    window.repeatAll = this.repeatAll
    window.repeatOne = this.repeatOne
    window.shuffleOn = this.shuffleOn
    window.shuffleOff = this.shuffleOff
    window.getAlbumTitle = this.getAlbumTitle
    window.getArtistName = this.getArtistName
    window.getSongTitle = this.getSongTitle
    window.info = this.info
    window.playFavorite = this.playFavorite
    window.flow = this.flow
  }

  play () {
    // $('.control-play').click()
    dzPlayer.control.play()
    return 'Playing...'
  }

  pause () {
    // $('.control-play').click()
    dzPlayer.control.pause()
    return 'Paused.'
  }

  next () {
    // $('.control-next').click()
    dzPlayer.control.nextSong()
    return 'Next...'
  }

  prev () {
    // $('.control-prev').click()
    dzPlayer.control.prevSong()
    return 'Prev...'
  }

  // TODO: make this one work!
  setVolume(value) {
    if (value > 100) value = 100
    if (value < 0) value = 0

    dzPlayer.control.setVolume(value)
    return `Vol set to ${value}`
  }

  unmute () {
    // $('.control-volume-mute').click()
    dzPlayer.control.mute(false)
    return 'Unmute.'
  }

  mute () {
    // $('.control-volume').click()
    dzPlayer.control.mute(true)
    return 'Mute.'
  }

  /**
   * Sets repeat mode.
   *
   * @param {int} value [0: off | 1:all | 2:one]
   */
  setRepeat(value) {
    dzPlayer.control.setRepeat(value)
    return `Repeat set to ${value}.`
  }

  repeatOff () {
    setRepeat(0)
    return 'Repeat off.'
  }

  repeatAll () {
    setRepeat(1)
    return 'Repeat all.'
  }

  repeatOne () {
    setRepeat(2)
    return 'Repeat one.'
  }

  setShuffle (value) {
    dzPlayer.control.setShuffle(value)
    return `Shuffle set to ${value}.`
  }

  shuffleOn () {
    setShuffle(true)
    return 'Shuffle on.'
  }

  shuffleOff () {
    setShuffle(false)
    return 'Shuffle off.'
  }

  getAlbumTitle () {
    return dzPlayer.getAlbumTitle()
  }

  getArtistName () {
    return dzPlayer.getArtistName()
  }

  getSongTitle () {
    return dzPlayer.getSongTitle()
  }

  info () {
    return {
      artist: getArtistName(),
      album: getAlbumTitle(),
      song: getSongTitle()
    }
  }

  playFavorite () {
    // play immediately if already on favorites page
    if (location.href.match(/loved$/)) {
      $('.btn-play')[1].click()
      return 'Playing favorite tracks...'
    }

    // goto favorites page, wait to let it load and play
    $('a[data-type=loved]')[0].click()
    setTimeout(() => {
      $('.btn-play')[1].click()
    }, 3000)
    return 'Playing favorite tracks...'
  }

  flow () {
    // play immediately if already on favorites page
    if (location.href.match(/loved$/)) {
      $('.btn-play')[0].click()
      return 'Flow...'
    }

    // goto favorites page, wait to let it load and play
    $('a[data-type=loved]')[0].click()
    setTimeout(() => {
      $('.btn-play')[0].click()
    }, 3000)
    return 'Flow...'
  }
}
