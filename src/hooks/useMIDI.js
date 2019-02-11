import { useState, useEffect } from 'react'
import { TYPES } from 'util/constants'
import { Map } from 'immutable'
import keys from 'lodash/keys'
import uniq from 'lodash/uniq'
import difference from 'lodash/difference'
import { getDistanceFromMiddleC } from 'enhancers/withTrack/utils'

const requestAccess = () => (navigator.requestMIDIAccess ? navigator.requestMIDIAccess() : Promise.reject())

const extractMIDIs = midis => {
  const result = {}
  result.bass = midis.bass?.filter(({ type }) => type === TYPES.NOTE).map(note => note.midi)
  result.treble = midis.treble?.filter(({ type }) => type === TYPES.NOTE).map(note => note.midi)
  return result
}
//
// const handleDevicesState = (access, handler) => {
//   handler(access.inputs.size > 0)
//   access.onstatechange = () => {
//     handler(access.inputs.size > 0)
//   }
// }

const handleKeyboardTestEvent = (event, handleInput, isDown) => {
  const dir = isDown ? 0x90 : 0x80
  switch (event.key) {
    case 'a':
      handleInput({ data: [dir, 40, 60] })
      break
    case 'b':
      handleInput({ data: [dir, 60, 60] })
      break
    case 'c':
      handleInput({ data: [dir, 64, 60] })
      break
    default:
      break
  }
}

const useInputHandler = (
  midis,
  pressedKeys,
  setPressedKeys,
  bumpIndex,
  wrongNotes,
  setWrongNotes,
  trackKey
) => event => {
  const eventType = event.data[0]
  const value = event.data[1]
  const keyVelocity = event.data[2] // === volume
  // data = [event type, note number, volume]
  if (eventType < 0x80 || eventType > 0x9f) return
  let newKeys = []
  let correctNotePressed = false
  const required = extractMIDIs(midis)

  if (eventType >= 0x90 && eventType <= 0x9f) {
    newKeys = pressedKeys.concat(value)
    keys(required).forEach(clef => {
      if (newKeys.length > 0 && newKeys.every(key => required[clef].indexOf(key) > -1)) {
        bumpIndex(clef)
        correctNotePressed = true
      }
    })
    console.log('key start', value)
  } else {
    newKeys = pressedKeys.filter(parsedKey => parsedKey !== value)
    console.log('key stop', value)
  }

  if (!correctNotePressed) {
    let newWrongNotes = Map({})
    keys(required).forEach(clef => {
      let predicate
      if (clef === 'treble') predicate = val => val > 48
      else predicate = val => val < 72
      const data = uniq(difference(newKeys.filter(predicate), required[clef])).map(val => ({
        position: getDistanceFromMiddleC(val, trackKey),
      }))
      if (!data.length) return
      const wrongNote = { clef, dot: 0, offset: 0, size: 8, data }
      newWrongNotes = newWrongNotes.set(clef, wrongNote)
    })

    setWrongNotes(newWrongNotes)
  }
  setPressedKeys(newKeys)
}

const useMIDI = (midis, bumpIndex, key) => {
  const [pressedKeys, setPressedKeys] = useState([])
  const [wrongNotes, setWrongNotes] = useState(Map({}))

  const handleInput = useInputHandler(midis, pressedKeys, setPressedKeys, bumpIndex, wrongNotes, setWrongNotes, key)

  useEffect(() => {
    requestAccess().then(access => {
      // handleDevicesState(access, setDeviceConnected)
      access.inputs.forEach(input => (input.onmidimessage = handleInput))
    })
    const handleKeydown = e => handleKeyboardTestEvent(e, handleInput, true)
    const handleKeyup = e => handleKeyboardTestEvent(e, handleInput, false)
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('keyup', handleKeyup)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keyup', handleKeyup)
    }
  })

  return {
    wrongNotes,
  }
}

export default useMIDI
