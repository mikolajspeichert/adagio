import React, { Fragment } from 'react'
import { compose, withHandlers } from 'recompose'

import Note from 'components/Note'
import EntryField from 'components/EntryField'
import { BASE_OFFSET, BASE_NOTE_WIDTH } from 'util/constants'

const enhance = compose(withHandlers({}))

const entryWidth = 80

const Displayer = enhance(({ clef, data = [], offset = 0, scale, height }) => (
  /* input clef here */
  <Fragment>
    <EntryField
      x={(BASE_OFFSET - 30) * scale}
      y={0}
      width={entryWidth * scale}
      height={height/2}
    />
    {data.map(note => (
      <Note
        key={note.offset}
        offset={(BASE_OFFSET + offset + note.offset) * scale}
        scale={scale}
        data={note}
      />
    ))}
  </Fragment>
))

export default Displayer
