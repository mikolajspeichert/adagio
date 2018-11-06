import { createSelectorCreator, defaultMemoize } from 'reselect'

import { TYPES } from 'util/constants'
import { getDistanceFromMiddleC, destructureNoteData } from './utils'

const createTrackSelector = createSelectorCreator(
  defaultMemoize,
  (currentVal, previousVal) => currentVal.isLoaded === previousVal.isLoaded
)

const transformClefData = (data, clef, key) =>
  data.map(structuredStep => {
    const step = structuredStep.map(destructureNoteData)
    const accumulator = {
      clef,
      type: TYPES.NOTE,
      size: step[0].size,
      data: [],
    }
    return step.reduce((acc, note) => {
      if (note.type === TYPES.PAUSE) {
        acc.type = TYPES.PAUSE
        acc.data.push(note)
      } else if (note.type === TYPES.TIED) {
        acc.type = TYPES.TIED
        acc.data.push({
          position: getDistanceFromMiddleC(note.midi, key, note.accidental),
          ...note,
        })
      } else {
        if (acc.type === TYPES.PAUSE || acc.type === TYPES.TIED)
          acc.type = TYPES.MIXED
        if (note.dot) acc.dot = note.dot
        acc.data.push({
          position: getDistanceFromMiddleC(note.midi, key, note.accidental),
          ...note,
        })
      }
      return acc
    }, accumulator)
  })

const transformTrackData = ({ data, meta, ...rest }) => {
  if (!data) return { meta, ...rest }
  const calculatedData = {
    treble: transformClefData(data.treble, 'treble', meta.key),
    bass: transformClefData(data.bass, 'bass', meta.key),
  }
  return {
    ...calculatedData,
    meta,
    ...rest,
  }
}

const selectTrack = createTrackSelector(
  state => state.track,
  transformTrackData
)

const selectTrackKey = state => ({ trackKey: state.track.meta.key })

export { selectTrack, selectTrackKey }
