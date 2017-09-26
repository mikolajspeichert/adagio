import random from '../util/rand'
import keyTranslator from '../util/keytranslator'

const ON_DRAW = 'ON_DRAW'
const RANDOM_NOTES = 'RANDOM_NOTES'
const AUDIO_PATTERNS = 'AUDIO_PATTERNS'

export const draw = () => ({
  type: ON_DRAW,
})

export const randomize = clef => {
  let value = {}
  let borderValue = {
    treble: 30,
    bass: 28,
  }
  value[clef] =
    random(0, 100) < 90 ? random(1, 22) : random(23, borderValue[clef])

  return {
    type: RANDOM_NOTES,
    value,
  }
}

export const generateNotes = () => (dispatch, getState) => {
  let state = getState()
  let value = {}
  state.clefs.forEach(clef => {
    dispatch(randomize(clef))
    let frequency = keyTranslator[clef][state.notes[clef]]
    value[clef] = frequency
  })
  return dispatch({
    type: AUDIO_PATTERNS,
    value,
  })
}

export const generateNoteFor = clef => (dispatch, getState) => {
  dispatch(randomize(clef))
  let frequency = keyTranslator[clef][getState().notes[clef]]
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
}
