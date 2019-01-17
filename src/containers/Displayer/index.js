import React, { Fragment } from 'react'

import Note from 'components/Note'
import EntryField from 'components/EntryField'
import {
  BASE_OFFSET,
  ENTRY_WIDTH,
  CORRECT_NOTE_BORDER_VALUE,
} from 'util/constants'

const Displayer = ({
  clef,
  data = [],
  offset = 0,
  scale,
  height,
  correctNote,
  correctOffset,
  wrongNote,
}) => (
  /* input clef here */
  <Fragment>
    {correctNote && (
      <Note
        key={correctNote.size + correctNote.data[0].position}
        offset={(BASE_OFFSET + correctOffset) * scale}
        alpha={1 - -correctOffset / CORRECT_NOTE_BORDER_VALUE}
        scale={scale}
        color={0x008000}
        data={correctNote}
      />
    )}
    {wrongNote && (
      <Note
        key={wrongNote.size + wrongNote.data[0].position}
        offset={BASE_OFFSET * scale}
        scale={scale}
        color={0xff0000}
        data={wrongNote}
      />
    )}
    <EntryField
      x={(BASE_OFFSET - 30) * scale}
      y={0}
      width={ENTRY_WIDTH * scale}
      height={height / 2}
    />
    {data.map(note => (
      <Note
        key={note.index}
        offset={(BASE_OFFSET + offset + note.offset) * scale}
        scale={scale}
        data={note}
      />
    ))}
  </Fragment>
)

export default Displayer
