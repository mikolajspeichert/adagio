import { compose, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'

import { awaitingMIDISelector } from './selectors'

const requestAccess = () =>
  navigator.requestMIDIAccess ? navigator.requestMIDIAccess() : Promise.reject()

const handleDevicesState = (access, handler) => {
  handler(access.inputs.size > 0)
  access.onstatechange = () => {
    handler(access.inputs.size > 0)
  }
}

const withConnect = connect(awaitingMIDISelector)

const withMIDI = compose(
  withState('deviceConnected', 'setDeviceConnected', false),
  withConnect,
  withHandlers({
    handleInputs: ({ midis }) => input => {
      input.onmidimessage = event => {
        if (event.data[0] === 0x90) console.log(event.data)
        // data = [event type, note number, volume]
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
