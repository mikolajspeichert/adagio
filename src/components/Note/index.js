import React, { Fragment } from 'react'
import styled from 'styled-components'
import { compose, withState, withProps, withHandlers } from 'recompose'

import { BASE_HEIGHT } from 'util/constants'
import { NoteLine } from 'assets/svgs'
import { c } from './stub'
import {
  getMiddleC,
  getCore,
  getCoreOffset,
  makeEven,
  shouldBeFacingBottom,
  getNoteWidth,
} from './utils'
import { Base, styledItem } from './styles'

const BASE_NOTE_WIDTH = 60
const BASE_LINE_HEIGHT = 100

const enhance = compose(
  withProps(({ data: note, scale }) => {
    const { clef, size, data } = note
    const middleC = getMiddleC(clef, scale)
    let topCoreOffset = BASE_HEIGHT
    let bottomCoreOffset = 0
    let cores = []
    data.forEach(({ position }) => {
      const Core = {}
      Core.svg = styledItem(getCore(size))
      Core.offsetY = getCoreOffset({ middleC, position, scale })
      if (Core.offsetY > bottomCoreOffset) bottomCoreOffset = Core.offsetY
      if (Core.offsetY < topCoreOffset) topCoreOffset = Core.offsetY
      if (
        data.some(otherNote => otherNote.position + 1 === position) &&
        !data.some(otherNote => otherNote.position - 1 === position)
      ) {
        let width = getNoteWidth(size) - 1
        Core.offsetX = width * scale
      }
      cores.push(Core)
    })
    const Line = {}
    Line.svg = styledItem(NoteLine)
    Line.height = BASE_LINE_HEIGHT * scale
    if (
      shouldBeFacingBottom({
        clef,
        scale,
        offsets: { bottomCoreOffset, topCoreOffset },
      })
    ) {
      Line.offsetY = topCoreOffset + 11 * scale
      Line.offsetX = -Math.floor(getNoteWidth(size) / 2 - 2)
    } else {
      Line.offsetY = bottomCoreOffset + (10 - BASE_LINE_HEIGHT) * scale
      Line.offsetX = Math.floor(getNoteWidth(size) / 2 - 1)
    }
    return {
      cores,
      Line,
    }
  })
)

const Note = enhance(({ scale, cores, Line }) => (
  <Base
    width={Math.floor(BASE_NOTE_WIDTH * scale)}
    height={Math.floor((BASE_HEIGHT / 2) * scale)}>
    {cores.map(Core => (
      <Core.svg
        key={Core.offsetY}
        x={Core.offsetX || 0}
        y={Core.offsetY}
        height={makeEven(10 * scale) * 2}
      />
    ))}
    <Line.svg
      y={Line.offsetY}
      x={Line.offsetX}
      height={Line.height}
      width={4 * scale}
    />
  </Base>
))

Note.defaultProps = {
  data: c,
}
export default Note
