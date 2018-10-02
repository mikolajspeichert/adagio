import { createReducer } from 'redux-create-reducer'

import { actions } from './actions'

const initialState = {
  isLoading: false,
  isLoaded: false,
  meta: {},
  data: null,
}

const track = createReducer(initialState, {
  [actions.START_LOADING](state) {
    return {
      ...state,
      isLoading: true,
    }
  },
  [actions.FINISH_LOADING](state) {
    return {
      ...state,
      isLoaded: true,
      isLoading: false,
    }
  },
  [actions.ADD_TRACK](state, action) {
    const { treble, bass, ...meta } = action.payload
    return {
      ...state,
      meta,
      data: {
        treble,
        bass,
      },
    }
  },
  [actions.PURGE_CURRENT]() {
    return initialState
  },
})

export default track
