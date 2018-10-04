import {
  compose,
  lifecycle,
  withState,
  withProps,
  withHandlers,
  setDisplayName,
} from 'recompose'

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
        const multiplier = 16 / note.size
        note.offset = multiplier * BASE_NOTE_WIDTH
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

const withPlayer = compose(
  setDisplayName('withPlayer'),
  withTrack,
  withState('indexes', 'updateIndexes', {
    bass: 0,
    treble: 0,
  }),
  withState('offsets', 'updateOffsets', {
    bass: 480,
    treble: 480,
  }),
  withState('stop', 'setStop', false),
  withHandlers({
    bumpIndex: ({ indexes, updateIndexes }) => clef =>
      updateIndexes({
        ...indexes,
        [clef]: indexes[clef] + 1,
      }),
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
    return {
      notes,
    }
  }),
  lifecycle({
    componentDidMount() {
      const { bumpIndex, calculate } = this.props
      this.intervals = []
      // this.intervals.push(
      //   setInterval(() => {
      //     // bumpIndex('treble')
      //     // bumpIndex('bass')
      //   }, 5000)
      // )
      // this.intervals.push(setInterval(calculate, 16.67))
      this.animator = new Animator()
      this.animator.subscribe(calculate)
      this.animator.start()
    },
    componentWillUnmount() {
      // this.intervals.forEach(clearInterval)
      this.animator.stop()
    },
  })
)

export default withPlayer
