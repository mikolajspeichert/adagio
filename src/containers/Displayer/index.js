import React, { Fragment } from 'react'
import { compose, withProps, withState, withHandlers } from 'recompose'
import styled from 'styled-components'

import { Scaled } from 'components/Paper'
import Note from 'components/Note'
import EntryField from 'components/EntryField'
import { BASE_OFFSET, BASE_NOTE_WIDTH } from 'util/constants'

const enhance = compose(
  withHandlers({}),
  withProps(({ data = [], offset }) => {
    let previousOffsets = 0
    let calculatedOffsets = data.map(note => {
      let temporaryOffset = note.offset
      note.offset = previousOffsets
      previousOffsets += temporaryOffset
      return note
    })
    return {
      data: calculatedOffsets,
    }
  })
)

const NotesContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const entryWidth = 70

const Displayer = enhance(({ clef, data = [], offset = 0 }) => (
  <Scaled>
    {({ scale }) => (
      /* input clef here */
      <Fragment>
        <EntryField
          offset={(BASE_OFFSET - (entryWidth - BASE_NOTE_WIDTH) / 2) * scale}
          width={entryWidth * scale}
        />
        <NotesContainer>
          {data.map((note, index) => (
            <Note
              key={note.offset}
              offset={(BASE_OFFSET + offset + note.offset) * scale}
              scale={scale}
              data={note}
            />
          ))}
        </NotesContainer>
      </Fragment>
    )}
  </Scaled>
))

export default Displayer
