import { actions } from './actions'

var initialState = {
  hidden: true,
  clefs: ['treble', 'bass'],
  notes: {
    treble: 30,
    bass: 28,
  },
  audio: {
    treble: undefined,
    bass: undefined,
  },
}

const notes = (state = initialState.notes, action) => {
  switch (action.type) {
    case actions.RANDOM_NOTES:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

const audio = (state = initialState.audio, action) => {
  switch (action.type) {
    case actions.AUDIO_PATTERNS:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ON_DRAW:
      return Object.assign({}, state, { hidden: !state.hidden })
    case actions.RANDOM_NOTES:
      return Object.assign({}, state, { notes: notes(state.notes, action) })
    case actions.AUDIO_PATTERNS:
      return Object.assign({}, state, {
        audio: audio(state.audio, action),
      })
    default:
      return state
  }
}
