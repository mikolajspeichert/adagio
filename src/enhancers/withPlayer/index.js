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

const extractOffset = note => {
  if (!note.dot) note.dot = 0
  const dotMultiplier = 1 + note.dot * 0.5
  const multiplier = 16 / note.size
  return multiplier * BASE_NOTE_WIDTH * dotMultiplier
}

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
        note.offset = extractOffset(note)
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
  withState(
    'successNotes',
    'setSuccessNote',
    Map({
      bass: null,
      treble: null,
    })
  ),
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
    // console.log(notes)
    return {
      notes,
    }
  }),
  withHandlers({
    bumpIndex: ({
      clefs,
      updateClefs,
      notes,
      successNotes,
      setSuccessNote,
    }) => clef => {
      let currentOffset = clefs.getIn([clef, 'offset'])
      if (currentOffset > ENTRY_WIDTH) return
      let successNote = notes[clef][0]
      setSuccessNote(successNotes.setIn([clef], successNote))
      const newClefsData = clefs
        .setIn([clef, 'successOffset'], currentOffset)
        .updateIn([clef, 'index'], index => index + 1)
        .updateIn(
          [clef, 'offset'],
          offset => offset + extractOffset(successNote)
        )
      updateClefs(newClefsData)
    },
  }),
  withHandlers({
    calculate: ({ clefs, updateClefs, notes, bumpIndex }) => interval => {
      if (isNaN(interval)) interval = 0 // eslint-disable-line
      const diff = 0.12 * interval
      const shouldUpdate =
        clefs.getIn(['treble', 'offset']) > 0 &&
        clefs.getIn(['bass', 'offset']) > 0

      updateClefs(
        clefs
          .updateIn(
            ['treble', 'offset'],
            offset => (shouldUpdate ? offset - diff : offset)
          )
          .updateIn(
            ['bass', 'offset'],
            offset => (shouldUpdate ? offset - diff : offset)
          )
          .updateIn(
            ['treble', 'successOffset'],
            offset =>
              offset > -SUCCESS_NOTE_BORDER_VALUE ? offset - diff : offset
          )
          .updateIn(
            ['bass', 'successOffset'],
            offset =>
              offset > -SUCCESS_NOTE_BORDER_VALUE ? offset - diff : offset
          )
      )
      if (!shouldUpdate) {
        const clefTypes = ['treble', 'bass']
        clefTypes.forEach(clef => {
          const { type } = notes[clef][0]
          if (
            (type === 'pause' || type === 'tied') &&
            clefs.getIn([clef, 'offset']) <= 0
          ) {
            bumpIndex(clef)
          }
        })
      }
    },
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
