import { compose, withHandlers, withState } from 'recompose'

const requestAccess = () =>
  navigator.requestMIDIAccess && navigator.requestMIDIAccess()

const handleDevicesState = (access, handler) => {
  handler(access.inputs.size > 0)
  access.onstatechange = () => {
    handler(access.inputs.size > 0)
  }
}

const withMIDI = compose(
  withState('deviceConnected', 'setDeviceConnected', false),
  withHandlers({
    handleInputs: ({ setDeviceConnected }) => () =>
      new Promise((resolve, reject) => {
        requestAccess()
          .then(access => {
            handleDevicesState(access, setDeviceConnected)
            access.inputs.forEach(input => {
              input.onmidimessage = event => {
                if (event.data[0] === 0x90) console.log(event.data)
                // data = [event type, note number, volume]
              }
            })
            resolve()
          })
          .catch(() => {
            console.log('No MIDI device. Trying again')
          })
      }),
  })
)

export default withMIDI
