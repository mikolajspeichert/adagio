import { createReducer } from 'redux-create-reducer'

import { actions } from './actions'

const initialState = {
  passed: {
    bass: false,
    treble: false,
  },
}

const player = createReducer(initialState, {
  [actions.SET_NEW]({ payload }, state) {
    return {
      passed: {
        ...state.passed,
        [payload.clef]: false,
      },
    }
  },
  [actions.SET_PASSED]({ payload }, state) {
    return {
      passed: {
        ...state.passed,
        [payload.clef]: true,
      },
    }
  },
})

export default player
