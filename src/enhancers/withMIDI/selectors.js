import { createSelector } from 'reselect'

const emptyTrackStub = {
  bass: [],
  treble: [],
}

const indexesSelector = (state, props) => props.clefs

const trackDataSelector = state =>
  state.track.isLoaded ? state.track.data : emptyTrackStub

const awaitingMIDISelector = createSelector(
  indexesSelector,
  trackDataSelector,
  (clefs, trackData) => ({
    midis: {
      bass: trackData.bass[clefs.getIn(['bass', 'index'])],
      treble: trackData.treble[clefs.getIn(['treble', 'index'])],
    },
  })
)

export { awaitingMIDISelector }
