import {
  compose,
  lifecycle,
  withState,
  withProps,
  withHandlers,
  setDisplayName,
} from 'recompose'
import { connect } from 'react-redux'

import Animator from 'util/Animator'
import { BASE_NOTE_WIDTH } from 'util/constants'
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

const prepareNotes = (raw, index) =>
  raw.slice(index, index + 10).map(note => {
    const multiplier = 16 / note.size
    note.offset = multiplier * BASE_NOTE_WIDTH
    return note
  })

const withPlayer = compose(
  setDisplayName('withPlayer'),
  withTrack,
  withState('indexes', 'updateIndexes', {
    bass: 0,
    treble: 0,
  }),
  withState('offsets', 'updateOffsets', {
    bass: 50,
    treble: 50,
  }),
  withState('stop', 'setStop', false),
  withHandlers({
    bumpIndex: ({ indexes, updateIndexes }) => clef =>
      updateIndexes({
        ...indexes,
        [clef]: indexes[clef] + 1,
      }),
    calculate: ({ offsets, updateOffsets }) => () => {
      if (offsets.treble > 0 && offsets.bass > 0) {
        updateOffsets({
          treble: offsets.treble - 0.1,
          bass: offsets.bass - 0.1,
        })
      }
      console.log(offsets.treble)
    },
  }),
  withProps(({ indexes, track }) => {
    if (!track?.treble || !track?.bass) return
    const notes = {
      treble: prepareNotes(track.treble, indexes.treble),
      bass: prepareNotes(track.bass, indexes.bass),
    }
    return { notes }
  }),
  lifecycle({
    componentDidMount() {
      const { bumpIndex, calculate } = this.props
      this.interval = setInterval(() => {
        // bumpIndex('treble')
        // bumpIndex('bass')
      }, 5000)
      this.animator = new Animator()
      this.animator.subscribe(calculate)
      this.animator.start()
    },
    componentWillUnmount() {
      clearInterval(this.interval)
      this.animator.stop()
    },
  })
)

export default withPlayer
