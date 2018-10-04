export default class Animator {
  constructor() {
    this.subscriber = null
    this.loopID = null
  }

  loop = timestamp => {
    this.subscriber(timestamp - this.counter)
    this.counter = timestamp
    this.loopID = window.requestAnimationFrame(this.loop)
  }

  start() {
    if (!this.loopID) {
    this.counter = 0
      this.loop()
    }
  }

  stop() {
    if (!this.loopID) {
      window.cancelAnimationFrame(this.loopID)
      this.loopID = null
    }
  }

  subscribe(callback) {
    this.subscriber = callback
  }

  unsubscribe() {
    this.subscriber = null
  }
}
