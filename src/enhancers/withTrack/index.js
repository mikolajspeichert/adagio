import { compose, withProps, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { loadTrack } from './actions'
import { selectTrack } from './selectors'

const withConnect = connect(state => ({
  track: selectTrack(state),
}))

const withTrack = compose(
  withConnect,
  withHandlers({
    fetchTrack: trackName => dispatch => {
      dispatch(loadTrack(trackName))
    },
  }),
  withProps(({ track }) => {
    console.log(track)
  })
)

export default withTrack
