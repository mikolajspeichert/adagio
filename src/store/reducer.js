import { actions } from './actions'

var initialState = {
  hidden: true,
  notesSize: 'all notes',
  clefs: ['treble', 'bass'],
  notes: {
    treble: 30,
    bass: 28,
  },
  audio: {
    treble: undefined,
    bass: undefined,
  },
  midi: {
    treble: undefined,
    bass: undefined,
  },
  noteTypes: ['normal', 'sharps', 'flats'],
}

const subArray = (state = { treble: undefined, bass: undefined }, action) => {
  switch (action.type) {
    case actions.RANDOM_NOTES:
    case actions.AUDIO_PATTERNS:
    case actions.MIDI_TARGETS:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ON_DRAW:
      return Object.assign({}, state, { hidden: !state.hidden })
    case actions.RANDOM_NOTES:
      return Object.assign({}, state, { notes: subArray(state.notes, action) })
    case actions.AUDIO_PATTERNS:
      return Object.assign({}, state, {
        audio: subArray(state.audio, action),
      })
    case actions.MIDI_TARGETS:
      return Object.assign({}, state, {
        midi: subArray(state.midi, action),
      })
    case actions.SETTINGS_CHANGE:
      return Object.assign({}, state, {
        [action.key]: action.value,
      })
    default:
      return state
  }
}
