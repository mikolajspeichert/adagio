import React, { Fragment } from 'react'
import styled from 'styled-components'

import { BASE_HEIGHT } from 'util/constants'
import { Pause8 } from './styles'
import { c } from './stub'
import { getMiddleC, getCore, getMargin, makeEven } from './utils'

const BASE_NOTE_WIDTH = 60

const Base = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
`

const styledNote = note => styled(note).attrs({
  style: ({ x, y }) => ({
    transform: `translate(${x}px, ${y}px)`,
  }),
})`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`

const generateNote = (notes, scale) => {
  let result = []
  const { clef, data } = notes
  const middleCLocation = getMiddleC(clef, scale)
  data.forEach(noteData => {
    const Note = {}
    Note.core = styledNote(getCore(noteData.size))
    Note.offset =
      middleCLocation -
      noteData.position * getMargin(scale) -
      Math.floor(noteData.position / 2) * Math.ceil(scale)
    result.push(Note)
  })
  return (
    <Fragment>
      {result.map(Note => (
        <Note.core
          key={Note.offset}
          x={0}
          y={Note.offset}
          height={makeEven(10 * scale) * 2}
        />
      ))}
    </Fragment>
  )
}

const Note = ({ scale, data = c }) => (
  <Base
    width={Math.floor(BASE_NOTE_WIDTH * scale)}
    height={Math.floor((BASE_HEIGHT / 2) * scale)}>
    {generateNote(data, scale)}
  </Base>
)

export default Note
