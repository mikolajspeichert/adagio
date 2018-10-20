import {
  compose,
  withHandlers,
  withState,
  lifecycle,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import keys from 'lodash/keys'

import { awaitingMIDISelector } from './selectors'

const requestAccess = () =>
  navigator.requestMIDIAccess ? navigator.requestMIDIAccess() : Promise.reject()

const extractMIDIs = midis => {
  const result = {}
  result.bass = midis.bass
    ?.filter(({ type }) => type !== 'pause')
    .map(note => note.midi)
  result.treble = midis.treble
    ?.filter(({ type }) => type !== 'pause')
    .map(note => note.midi)
  return result
}

const handleDevicesState = (access, handler) => {
  handler(access.inputs.size > 0)
  access.onstatechange = () => {
    handler(access.inputs.size > 0)
  }
}

const withConnect = connect(awaitingMIDISelector)

const withMIDI = compose(
  withState('deviceConnected', 'setDeviceConnected', false),
  withState('pressedKeys', 'setPressedKeys', [60]),
  withState('correctlyPressedIndex', 'updateCorrectlyPressedIndex', {
    bass: null,
    treble: null,
  }),
  withConnect,
  withHandlers({
    handleInputs: ({
      midis,
      pressedKeys,
      setPressedKeys,
      bumpIndex,
    }) => input => {
      const requiredValues = extractMIDIs(midis)
      input.onmidimessage = event => {
        const eventType = event.data[0]
        const value = event.data[1]
        const keyVelocity = event.data[2] // === volume
        // data = [event type, note number, volume]
        let newKeys
        if (eventType >= 0x90 && eventType <= 0x9f) {
          newKeys = pressedKeys.concat(value)
          keys(requiredValues).forEach(clef => {
            if (
              newKeys.length > 0 &&
              newKeys.every(key => requiredValues[clef].indexOf(key) > -1)
            ) {
              bumpIndex(clef)
            }
          })
          console.log('key start', value)
        } else if (eventType >= 0x80 && eventType <= 0x8f) {
          newKeys = pressedKeys.filter(parsedKey => parsedKey !== value)
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
  }),
  withProps(({ midis }) => {
    // console.log(extractMIDIs(midis))
  }),
  lifecycle({
    componentDidMount() {
      const { connectMIDI } = this.props
      connectMIDI()
    },
  })
)

export default withMIDI
