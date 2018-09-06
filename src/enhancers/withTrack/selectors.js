import { createSelectorCreator, defaultMemoize } from 'reselect'

const createTrackSelector = createSelectorCreator(
  defaultMemoize,
  (currentVal, previousVal) => currentVal.meta.name === previousVal.meta.name
)

const transformTrackData = track => track

const selectTrack = createTrackSelector(
  state => state.track,
  transformTrackData
)

export { selectTrack }