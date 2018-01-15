import keys from './keys'

export default (note, clef) => {
  let borderValue = clef === 'treble' ? 30 : 28
  if (note <= borderValue) return keys.midi[clef][note] // normal
  if (note <= 2 * borderValue) {
    note -= borderValue // sharp
    return keys.midi[clef][note] + 1
  }
  note -= 2 * borderValue // flat
  return keys.midi[clef][note] - 1
}
