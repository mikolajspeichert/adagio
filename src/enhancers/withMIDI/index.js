import {
  compose,
  withHandlers,
  withState,
  lifecycle,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import keys from 'lodash/keys'
import difference from 'lodash/difference'

import { getDistanceFromMiddleC } from 'enhancers/withTrack/utils'
import { selectTrackKey } from 'enhancers/withTrack/selectors'
import { awaitingMIDISelector } from './selectors'

const requestAccess = () =>
  navigator.requestMIDIAccess ? navigator.requestMIDIAccess() : Promise.reject()

const extractMIDIs = midis => {
  const result = {}
  result.bass = midis.bass
    ?.filter(({ type }) => type === 'note')
    .map(note => note.midi)
  result.treble = midis.treble
    ?.filter(({ type }) => type === 'note')
    .map(note => note.midi)
  return result
}

const handleDevicesState = (access, handler) => {
  handler(access.inputs.size > 0)
  access.onstatechange = () => {
    handler(access.inputs.size > 0)
  }
}

const withMIDI = compose(
  withState('deviceConnected', 'setDeviceConnected', false),
  withState('pressedKeys', 'setPressedKeys', []),
  withState('wrongNotes', 'setWrongNotes', Map({})),
  connect(awaitingMIDISelector),
  connect(selectTrackKey),
  withHandlers({
    handleInput: ({
      midis,
      pressedKeys,
      setPressedKeys,
      bumpIndex,
      wrongNotes,
      setWrongNotes,
      trackKey,
    }) => event => {
      const eventType = event.data[0]
      const value = event.data[1]
      const keyVelocity = event.data[2] // === volume
      // data = [event type, note number, volume]
      if (eventType < 0x80 || eventType > 0x9f) return
      let newKeys = []
      const required = extractMIDIs(midis)

      if (eventType >= 0x90 && eventType <= 0x9f) {
        newKeys = pressedKeys.concat(value)
        keys(required).forEach(clef => {
          if (
            newKeys.length > 0 &&
            newKeys.every(key => required[clef].indexOf(key) > -1)
          ) {
            bumpIndex(clef)
          }
        })

        console.log('key start', value)
      } else {
        newKeys = pressedKeys.filter(parsedKey => parsedKey !== value)
        console.log('key stop', value)
      }
      let newWrongNotes = Map({})
      keys(required).forEach(clef => {
        let predicate
        if (clef === 'treble') predicate = val => val > 48
        else predicate = val => val < 72
        const data = difference(newKeys.filter(predicate), required[clef]).map(
          val => ({
            position: getDistanceFromMiddleC(val, trackKey),
          })
        )
        if (!data.length) return
        const wrongNote = { clef, dot: 0, offset: 0, size: 8, data }
        newWrongNotes = newWrongNotes.set(clef, wrongNote)
      })

      setWrongNotes(newWrongNotes)
      setPressedKeys(newKeys)
    },
  }),
  withHandlers({
    connectMIDI: ({ setDeviceConnected, handleInput }) => () =>
      new Promise((resolve, reject) => {
        requestAccess()
          .then(access => {
            handleDevicesState(access, setDeviceConnected)
            access.inputs.forEach(input => (input.onmidimessage = handleInput))
            resolve()
          })
          .catch(() => {
            console.log('No MIDI device. Trying again')
          })
      }),
    handleTestingKey: ({ handleInput }) => event => {
      switch (event.key) {
        case 'a':
          handleInput({ data: [0x90, 40, 60] })
          break
        default:
          handleInput({ data: [0x80, 40, 60] })
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const { connectMIDI, handleTestingKey } = this.props
      connectMIDI()
      document.addEventListener('keydown', handleTestingKey)
    },
    componentWillUnmount() {
      const { handleTestingKey } = this.props
      document.removeEventListener('keydown', handleTestingKey)
    },
  })
)

export default withMIDI
