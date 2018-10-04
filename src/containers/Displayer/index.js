import React, { Fragment } from 'react'
import { compose, withHandlers } from 'recompose'

import Note from 'components/Note'
import EntryField from 'components/EntryField'
import { BASE_OFFSET, BASE_NOTE_WIDTH } from 'util/constants'

const enhance = compose(withHandlers({}))

const entryWidth = 70

const Displayer = enhance(({ clef, data = [], offset = 0, scale }) => (
  /* input clef here */
  <Fragment>
    {/* <EntryField */}
    {/* offset={(BASE_OFFSET - (entryWidth - BASE_NOTE_WIDTH) / 2) * scale} */}
    {/* width={entryWidth * scale} */}
    {/* /> */}
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
