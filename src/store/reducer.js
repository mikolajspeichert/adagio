import { combineReducers } from 'redux'
import track from 'enhancers/withTrack/reducer'
import player from 'enhancers/withPlayer/reducer'

export default combineReducers({
  track,
  player,
})
