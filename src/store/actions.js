import random from '../util/rand'
import translate from '../util/keytranslator'

const ON_DRAW = 'ON_DRAW'
const RANDOM_NOTES = 'RANDOM_NOTES'
const AUDIO_PATTERNS = 'AUDIO_PATTERNS'
const SETTINGS_CHANGE = 'SETTINGS_CHANGE'

export const draw = () => ({
  type: ON_DRAW,
})

export const randomize = (clef, notesSize, noteTypes) => {
  if (noteTypes.length === 0) return
  let value = {}
  let borderValue = {
    treble: 30,
    bass: 28,
  }
  let magicNumber = random(0, noteTypes.length - 1)
  value[clef] =
    random(0, 100) > 90 && notesSize === 'all notes'
      ? random(23, borderValue[clef])
      : random(1, 22)

  switch (noteTypes[magicNumber]) {
    case 'sharps':
      value[clef] += borderValue[clef]
      break
    case 'flats':
      value[clef] += 2 * borderValue[clef]
      break
    default:
      break
  }
  return {
    type: RANDOM_NOTES,
    value,
  }
}

export const changeSettings = (key, value) => ({
  type: SETTINGS_CHANGE,
  key,
  value,
})

export const generateNotes = () => (dispatch, getState) => {
  let state = getState()
  let value = {}
  state.clefs.forEach(clef => {
    dispatch(randomize(clef, state.notesSize, state.noteTypes))
    let frequency = translate(getState().notes[clef], clef)
    value[clef] = frequency
  })
  return dispatch({
    type: AUDIO_PATTERNS,
    value,
  })
}

export const generateNoteFor = clef => (dispatch, getState) => {
  let state = getState()
  dispatch(randomize(clef, state.notesSize, state.noteTypes))
  let frequency = translate(getState().notes[clef], clef)
  return dispatch({
    type: AUDIO_PATTERNS,
    value: {
      [clef]: frequency,
    },
  })
}

export const actions = {
  ON_DRAW,
  RANDOM_NOTES,
  AUDIO_PATTERNS,
  SETTINGS_CHANGE,
}
