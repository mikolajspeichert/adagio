import { BASE_NOTE_WIDTH } from 'util/constants'

const extractOffset = note => {
  if (!note.dot) note.dot = 0
  const dotMultiplier = 1 + note.dot * 0.5
  const multiplier = 16 / note.size
  return multiplier * BASE_NOTE_WIDTH * dotMultiplier
}

const memoizeNotes = () => {
  let cacheValue = {
    treble: null,
    bass: null,
  }
  let cacheIndex = {
    treble: null,
    bass: null,
  }
  return (raw, index, clef) => {
    if (cacheIndex[clef] === index) {
      return cacheValue[clef]
    }
    cacheIndex[clef] = index
    let previousOffsets = 0
    cacheValue[clef] = raw
      .slice(index, index + 30)
      .map(note => {
        note.offset = extractOffset(note)
        return note
      })
      .map((note, internalIndex) => {
        note.index = internalIndex + index // TO AVOID RERENDERING WHILE CHANGING INDEX
        let temporaryOffset = note.offset
        note.offset = previousOffsets
        previousOffsets += temporaryOffset
        return note
      })
    return cacheValue[clef]
  }
}

const prepareNotes = memoizeNotes()

export { prepareNotes, extractOffset }
