import { actions } from './actions'

var initialState = {
  hidden: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ON_DRAW:
      return Object.assign({}, state, { hidden: !state.hidden })
    default:
      return state
  }
}
