import { createSelector } from 'reselect'

const emptyTrackStub = {
  bass: [],
  treble: [],
}

const indexesSelector = state => state.player.indexes

const trackDataSelector = state =>
  state.track.isLoaded ? state.track.data : emptyTrackStub

const awaitingMIDISelector = createSelector(
  indexesSelector,
  trackDataSelector,
  (indexes, trackData) => ({
    midis: {
      bass: trackData.bass[indexes.bass],
      treble: trackData.treble[indexes.treble],
    },
  })
)

export { awaitingMIDISelector }