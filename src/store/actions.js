import random from '../util/rand'
import keyTranslator from '../util/keytranslator'
import frequencies from '../util/frequencies'

const ON_DRAW = 'ON_DRAW'
const RANDOM_NOTES = 'RANDOM_NOTES'

export const draw = () => ({
  type: ON_DRAW,
})

export const randomizeTreble = () => {
  let treble = random(0, 100) < 90 ? random(1, 22) : random(23, 30)
  return {
    type: RANDOM_NOTES,
    value: {
      treble,
    },
  }
}

export const randomizeBass = () => {
  let bass = random(0, 100) < 90 ? random(1, 22) : random(23, 28)
  return {
    type: RANDOM_NOTES,
    value: {
      bass,
    },
  }
}

export const translateKey = () => (dispatch, getState) => {
  let state = getState()
  state.clefs.map(clef => {
    let wantedFrequency = frequencies.calculate(
      keyTranslator[clef][state.notes[clef]]
    )
    console.log(wantedFrequency)
  })
}

export const actions = {
  ON_DRAW,
  RANDOM_NOTES,
}
