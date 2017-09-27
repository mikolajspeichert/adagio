import random from '../util/rand'
import keyTranslator from '../util/keytranslator'

const ON_DRAW = 'ON_DRAW'
const RANDOM_NOTES = 'RANDOM_NOTES'
const AUDIO_PATTERNS = 'AUDIO_PATTERNS'
const SETTINGS_CHANGE = 'SETTINGS_CHANGE'

export const draw = () => ({
  type: ON_DRAW,
})

export const randomize = (clef, notesSize) => {
  let value = {}
  let borderValue = {
    treble: 30,
    bass: 28,
  }
  value[clef] =
    random(0, 100) > 90 && notesSize === 'all notes'
      ? random(23, borderValue[clef])
      : random(1, 22)

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
    dispatch(randomize(clef, state.notesSize))
    let frequency = keyTranslator[clef][state.notes[clef]]
    value[clef] = frequency
  })
  return dispatch({
    type: AUDIO_PATTERNS,
    value,
  })
}

export const generateNoteFor = clef => (dispatch, getState) => {
  let state = getState()
  dispatch(randomize(clef, state.notesSize))
  let frequency = keyTranslator[clef][state.notes[clef]]
  console.log(clef, frequency)
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
