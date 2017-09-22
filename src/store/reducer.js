import { actions } from './actions'

var initialState = {
  hidden: true,
  clefs: ['treble', 'bass'],
  notes: {
    treble: 30,
    bass: 28,
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

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ON_DRAW:
      return Object.assign({}, state, { hidden: !state.hidden })
    case actions.RANDOM_NOTES:
      return Object.assign({}, state, { notes: notes(state.notes, action) })
    default:
      return state
  }
}
