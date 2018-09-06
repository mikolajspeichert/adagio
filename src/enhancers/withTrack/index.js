import { compose, withProps, withHandlers, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import { loadTrack } from './actions'
import { selectTrack } from './selectors'

const withConnect = connect(state => ({
  track: selectTrack(state),
}))

const withTrack = compose(
  setDisplayName('withTrack'),
  withConnect,
  withHandlers({
    fetchTrack: ({ dispatch }) => trackName => {
      dispatch(loadTrack(trackName))
    },
  }),
  withProps(({ track }) => {
    console.log(track)
  })
)

export default withTrack
