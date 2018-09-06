import { createSelectorCreator, defaultMemoize } from 'reselect'

import { getDistanceFromMiddleC } from './utils'

const createTrackSelector = createSelectorCreator(
  defaultMemoize,
  (currentVal, previousVal) => currentVal.meta.name === previousVal.meta.name
)

const transformClefData = (data, clef, key) => {
  return data.map(step => {
    const accumulator = {
      clef,
      size: step[0].size,
      data: [],
    }
    return step.reduce((acc, note) => {
      acc.data.push({
        position: getDistanceFromMiddleC(note.midi, key, note.accidental),
        ...note,
      })
      return acc
    }, accumulator)
  })
}

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

export { selectTrack }
