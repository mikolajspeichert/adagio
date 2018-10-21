import React, { Fragment } from 'react'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'

import Note from 'components/Note'
import EntryField from 'components/EntryField'
import { getDistanceFromMiddleC } from 'enhancers/withTrack/utils'
import {
  BASE_OFFSET,
  ENTRY_WIDTH,
  SUCCESS_NOTE_BORDER_VALUE,
} from 'util/constants'
import { selectTrackKey } from 'enhancers/withTrack/selectors'

const enhance = compose(
  connect(selectTrackKey)
  // withProps(({ clef, pressed, trackKey }) => {
  //   if (pressed.length === 0) return
  //   const isTreble = clef === 'treble'
  //   const borderValue = isTreble ? 52 : 69
  //   const predicate = ({ value }) =>
  //     isTreble ? value > borderValue : value < borderValue
  //   const pressedNote = { clef, dot: 0, offset: 0, size: 8 }
  //   pressedNote.data = pressed.filter(predicate).map(({ value, correct }) => ({
  //     position: getDistanceFromMiddleC(value, trackKey),
  //     correct,
  //   }))
  //   pressedNote.correct = !pressedNote.data.some(({ correct }) => !correct)
  //   return {
  //     pressedNote,
  //   }
  // })
)

const Displayer = enhance(
  ({
    clef,
    data = [],
    offset = 0,
    scale,
    height,
    successNote,
    successOffset,
  }) => (
    /* input clef here */
    <Fragment>
      {successNote && (
        <Note
          offset={(BASE_OFFSET + successOffset) * scale}
          alpha={1 - -successOffset / SUCCESS_NOTE_BORDER_VALUE}
          scale={scale}
          data={successNote}
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
          key={note.offset}
          offset={(BASE_OFFSET + offset + note.offset) * scale}
          scale={scale}
          data={note}
        />
      ))}
    </Fragment>
  )
)

export default Displayer
