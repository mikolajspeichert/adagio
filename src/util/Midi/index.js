export default class Midi {
  constructor(midi, onEvent) {
    this.midi = midi
    this.listInputs(midi)
    this.onEvent = onEvent
    // this.analyseInputs = this.analyseInputs.bind(this)
  }

  /* eslint-disable no-restricted-syntax */
  listInputs = midi => {
    for (let entry of midi.inputs) {
      let input = entry[1]
      console.log(
        `Input port [type:'${input.type}'] id:'${input.id}' manufacturer:'${
          input.manufacturer
        }' name:'${input.name}' version:'${input.version}'`
      )
    }
  }
  /* eslint-enable no-restricted-syntax */

  onMessage = event => {
    console.log(event)
    // let log = `MIDI message received at timestamp ${event.timestamp}[${
    //   event.data.length
    // } bytes]: `
    // for (let i = 0; i < event.data.length; i++) {
    //   log += `0x${event.data[i].toString(16)} `
    // }
    // console.log(log)
    if (event.data[0] === 0x90) this.onEvent(event.data[1])
  }

  analyseInputs = () => {
    this.midi.inputs.forEach(entry => (entry.onmidimessage = this.onMessage))
  }
}
