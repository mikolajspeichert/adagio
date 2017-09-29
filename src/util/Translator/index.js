import frequencies from './frequencies'
import keys from './keys'

export default class Translator {
  static audio = (note, clef) => {
    let borderValue = clef === 'treble' ? 30 : 28
    let type
    if (note <= borderValue) {
      // natural note
      type = 'natural'
    } else if (note <= 2 * borderValue) {
      // sharp note
      type = 'sharp'
      note -= borderValue
    } else {
      // flat note
      type = 'flat'
      note -= 2 * borderValue
    }
    return {
      flat: frequencies[keys.audio[clef][note][type] - 1],
      natural: frequencies[keys.audio[clef][note][type]],
      sharp: frequencies[keys.audio[clef][note][type] + 1],
    }
  }

  static midi = (note, clef) => {
    let borderValue = clef === 'treble' ? 30 : 28
    if (note <= borderValue) return keys.midi[clef][note] // normal
    if (note <= 2 * borderValue) {
      note -= borderValue // sharp
      return keys.midi[clef][note] + 1
    }
    note -= 2 * borderValue // flat
    return keys.midi[clef][note] - 1
  }
}
