import { actions } from './actions'

var initialState = {
  hidden: true,
  clefs: ['treble', 'bass'],
  notes: {
    treble: 26,
    bass: 26,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ON_DRAW:
      return Object.assign({}, state, { hidden: !state.hidden })
    default:
      return state
  }
}
