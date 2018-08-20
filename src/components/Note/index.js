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
  data.forEach(({ position, size }) => {
    const Note = {}
    Note.core = styledNote(getCore(size))
    Note.offsetY =
      middleCLocation -
      position * getMargin(scale) -
      Math.floor(position / 2) * Math.ceil(scale)
    if (
      position % 2 === 0 &&
      data.some(
        otherNote =>
          otherNote.position - 1 === position ||
          otherNote.position + 1 === position
      )
    ) {
      Note.offsetX = 25
    }
    result.push(Note)
  })
  return (
    <Fragment>
      {result.map(Note => (
        <Note.core
          key={Note.offsetY}
          x={Note.offsetX || 0}
          y={Note.offsetY}
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
