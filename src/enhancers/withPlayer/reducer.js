import { createReducer } from 'redux-create-reducer'

import { actions } from './actions'

const initialState = {
  indexes: {
    bass: 0,
    treble: 0,
  },
}

const player = createReducer(initialState, {
  [actions.BUMP_INDEX]({ payload }, state) {
    const { clef } = payload
    return {
      indexes: {
        ...state.indexes,
        [clef]: state.indexes[clef] + 1,
      },
    }
  },
})

export default player
