import { compose, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'

import { awaitingMIDISelector } from './selectors'

const requestAccess = () =>
  navigator.requestMIDIAccess ? navigator.requestMIDIAccess() : Promise.reject()

const extractMIDIs = midis => {
  const result = []
  midis.bass.forEach(note => {
    result.push(note.midi)
  })
  midis.treble.forEach(note => {
    result.push(note.midi)
  })
  return result
}

const parsePressedKey = (value, correct) => ({
  value,
  correct,
})

const handleDevicesState = (access, handler) => {
  handler(access.inputs.size > 0)
  access.onstatechange = () => {
    handler(access.inputs.size > 0)
  }
}

const withConnect = connect(awaitingMIDISelector)

const withMIDI = compose(
  withState('deviceConnected', 'setDeviceConnected', false),
  withState('pressedKeys', 'setPressedKeys', []),
  withConnect,
  withHandlers({
    handleInputs: ({ midis, pressedKeys, setPressedKeys }) => input => {
      const requiredValues = extractMIDIs(midis)
      input.onmidimessage = event => {
        const eventType = event.data[0]
        const value = event.data[1]
        const keyVelocity = event.data[2] // === volume
        // data = [event type, note number, volume]
        let newKeys
        if (eventType >= 0x90 && eventType <= 0x9f) {
          newKeys = pressedKeys.concat(
            parsePressedKey(value, requiredValues.includes(value))
          )
          console.log('key start', value)
        } else if (eventType >= 0x80 && eventType <= 0x8f) {
          newKeys = pressedKeys.filter(parsedKey => parsedKey.value !== value)
          console.log('key stop', value)
        } else {
          console.log('Unrecognized event. Skipping')
        }

        setPressedKeys(newKeys)
      }
    },
  }),
  withHandlers({
    connectMIDI: ({ setDeviceConnected, handleInputs }) => () =>
      new Promise((resolve, reject) => {
        requestAccess()
          .then(access => {
            handleDevicesState(access, setDeviceConnected)
            access.inputs.forEach(handleInputs)
            resolve()
          })
          .catch(() => {
            console.log('No MIDI device. Trying again')
          })
      }),
  })
)

export default withMIDI
