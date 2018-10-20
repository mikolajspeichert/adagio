import {
  compose,
  lifecycle,
  withState,
  withProps,
  withHandlers,
  setDisplayName,
} from 'recompose'
import { Map } from 'immutable'
import Animator from 'util/Animator'
import {
  BASE_NOTE_WIDTH,
  ENTRY_WIDTH,
  SUCCESS_NOTE_BORDER_VALUE,
} from 'util/constants'
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

const initialClefValues = Map({
  index: 0,
  offset: 480,
  successOffset: -SUCCESS_NOTE_BORDER_VALUE,
})

const prepareNotes = memoizeNotes()

const withPlayer = compose(
  setDisplayName('withPlayer'),
  withTrack,
  withState(
    'clefs',
    'updateClefs',
    Map({
      bass: initialClefValues,
      treble: initialClefValues,
    })
  ),
  withState('stop', 'setStop', false),
  withHandlers({
    bumpIndex: ({ clefs, updateClefs }) => clef => {
      if (clefs.getIn([clef, 'index']) > ENTRY_WIDTH) return
      const newClefsData = clefs
        .setIn([clef, 'successOffset'], clefs.getIn([clef, 'offset']))
        .updateIn([clef, 'index'], index => index + 1)
      updateClefs(newClefsData)
    },
    calculate: ({ clefs, updateClefs }) => interval => {
      if (isNaN(interval)) interval = 0 // eslint-disable-line
      updateClefs(
        clefs
          .updateIn(
            ['treble', 'offset'],
            offset => (offset > 0 ? offset - 0.12 * interval : 0)
          )
          .updateIn(
            ['bass', 'offset'],
            offset => (offset > 0 ? offset - 0.12 * interval : 0)
          )
      )
    },
  }),
  withProps(({ clefs, track }) => {
    if (!track.isLoaded) return
    const notes = {
      treble: prepareNotes(
        track.treble,
        clefs.getIn(['treble', 'index']),
        'treble'
      ),
      bass: prepareNotes(track.bass, clefs.getIn(['bass', 'index']), 'bass'),
    }
    return {
      notes,
    }
  }),
  lifecycle({
    componentDidMount() {
      const { calculate } = this.props
      this.animator = new Animator()
      this.animator.subscribe(calculate)
      this.animator.start()
    },
    componentWillUnmount() {
      this.animator.stop()
    },
  })
)

export default withPlayer
