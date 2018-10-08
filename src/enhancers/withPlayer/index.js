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
import withTrack from '../withTrack'

const memoizeNotes = () => {
  let cacheValue = {
    treble: null,
    bass: null,
  }
  let cacheIndex = {
    treble: null,
    bass: null,
  }
  return (raw, index, clef) => {
    if (cacheIndex[clef] === index) {
      return cacheValue[clef]
    }
    cacheIndex[clef] = index
    let previousOffsets = 0
    cacheValue[clef] = raw
      .slice(index, index + 30)
      .map(note => {
        if (!note.dot) note.dot = 0
        const dotMultiplier = 1 + note.dot * 0.5
        const multiplier = 16 / note.size
        note.offset = multiplier * BASE_NOTE_WIDTH * dotMultiplier
        return note
      })
      .map(note => {
        let temporaryOffset = note.offset
        note.offset = previousOffsets
        previousOffsets += temporaryOffset
        return note
      })
    return cacheValue[clef]
  }
}

const prepareNotes = memoizeNotes()

const withConnect = connect(state => state.player)

const withPlayer = compose(
  setDisplayName('withPlayer'),
  withTrack,
  withConnect,
  withState('offsets', 'updateOffsets', {
    bass: 480,
    treble: 480,
  }),
  withState('stop', 'setStop', false),
  withHandlers({
    // bumpIndex: ({ indexes, updateIndexes }) => clef =>
    //   updateIndexes({
    //     ...indexes,
    //     [clef]: indexes[clef] + 1,
    //   }),
    calculate: ({ offsets, updateOffsets }) => interval => {
      if (isNaN(interval)) interval = 0 // eslint-disable-line
      if (offsets.treble > 0 && offsets.bass > 0) {
        updateOffsets({
          treble: offsets.treble - 0.12 * interval,
          bass: offsets.bass - 0.12 * interval,
        })
      }
    },
  }),
  withProps(({ indexes, track }) => {
    if (!track.isLoaded) return
    const notes = {
      treble: prepareNotes(track.treble, indexes.treble, 'treble'),
      bass: prepareNotes(track.bass, indexes.bass, 'bass'),
    }
    // console.log(notes)
    return {
      notes,
    }
  }),
  lifecycle({
    componentDidMount() {
      const { calculate } = this.props
      this.intervals = []
      // this.intervals.push(
      //   setInterval(() => {
      //     bumpIndex('treble')
      //     bumpIndex('bass')
      // }, 5000)
      // )
      // this.intervals.push(setInterval(calculate, 16.67))
      this.animator = new Animator()
      this.animator.subscribe(calculate)
      this.animator.start()
    },
    componentWillUnmount() {
      this.intervals.forEach(clearInterval)
      this.animator.stop()
    },
  })
)

export default withPlayer
