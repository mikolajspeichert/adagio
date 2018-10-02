import {
  compose,
  lifecycle,
  withState,
  withProps,
  withHandlers,
  setDisplayName,
} from 'recompose'
import { connect } from 'react-redux'

import { setNewNote, setNotePassed } from './actions'
import withTrack from '../withTrack'

const withConnect = connect(
  state => ({
    passed: state.player.passed,
  }),
  dispatch => ({
    bumpNote: clef => dispatch(setNotePassed(clef)),
  })
)

const withPlayer = compose(
  setDisplayName('withPlayer'),
  withTrack,
  withState('indexes', 'updateIndexes', {
    bass: 0,
    treble: 0,
  }),
  withState('stop', 'setStop', false),
  withState('interval', 'assignInterval', null), // testing purposes
  withHandlers({
    bumpIndex: ({ indexes, updateIndexes }) => clef =>
      updateIndexes({
        ...indexes,
        [clef]: indexes[clef] + 1,
      }),
  }),
  withProps(({ indexes, track }) => {
    if (!track?.treble || !track?.bass) return
    const notes = {
      treble: track.treble.slice(indexes.treble, indexes.treble + 20),
      bass: track.bass.slice(indexes.bass, indexes.bass + 20),
    }
    return { notes }
  }),
  lifecycle({
    componentDidMount() {
      const { assignInterval, bumpIndex } = this.props
      assignInterval(
        setInterval(() => {
          bumpIndex('treble')
          bumpIndex('bass')
        }, 5000)
      )
    },
    componentWillUnmount() {
      const { interval } = this.props
      clearInterval(interval)
    },
  })
)

export default withPlayer
