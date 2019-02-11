import { createSelector } from 'reselect'

const emptyTrackStub = {
  bass: [],
  treble: [],
}

const indexesSelector = (state, props) => props.clefs

const trackDataSelector = state => ({
  trackData: state.track.isLoaded ? state.track.data : emptyTrackStub,
})

const awaitingMIDISelector = createSelector(
  indexesSelector,
  trackDataSelector,
  (clefs, { trackData }) => ({
    midis: {
      bass: trackData.bass[clefs.getIn(['bass', 'index'])],
      treble: trackData.treble[clefs.getIn(['treble', 'index'])],
    },
  })
)

const useTrackMapper = (clefs, track) => {
  const data = track.isLoaded ? track : emptyTrackStub
  return {
    bass: data.bass[clefs.getIn(['bass', 'index'])],
    treble: data.treble[clefs.getIn(['treble', 'index'])],
  }
}

export { awaitingMIDISelector, useTrackMapper }
