import { createSelectorCreator, defaultMemoize } from 'reselect'

import { getDistanceFromMiddleC } from './utils'

const createTrackSelector = createSelectorCreator(
  defaultMemoize,
  (currentVal, previousVal) => currentVal.isLoaded === previousVal.isLoaded
)

const transformClefData = (data, clef, key) =>
  data.map(step => {
    const accumulator = {
      clef,
      type: 'note',
      size: step[0].size,
      data: [],
    }
    return step.reduce((acc, note) => {
      if (note.type === 'pause') {
        acc.type = 'pause'
        acc.data.push(note)
      } else {
        if (acc.type === 'pause') acc.type = 'mixed'
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

export { selectTrack }
