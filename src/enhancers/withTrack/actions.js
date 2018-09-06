import tracks from 'tracks'

const START_LOADING = 'TRACKS/START_LOADING'
const PURGE_CURRENT = 'TRACKS/PURGE_CURRENT'
const ADD_TRACK = 'TRACKS/ADD_TRACK'
const FINISH_LOADING = 'TRACKS/FINISH_LOADING'

export const actions = {
  START_LOADING,
  ADD_TRACK,
  FINISH_LOADING,
  PURGE_CURRENT,
}

const createAction = (type, payload) => ({ type, payload })

const loadTrack = trackName => async dispatch => {
  dispatch(createAction(PURGE_CURRENT))
  dispatch(createAction(START_LOADING))
  // const track = await tracks[trackName]
  // dispatch(createAction(ADD_TRACK, track))
  dispatch(createAction(FINISH_LOADING))
}

export { loadTrack }
