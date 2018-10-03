import React from 'react'
import { compose, withPropsOnChange } from 'recompose'

import { BASE_NOTE_WIDTH, BASE_HEIGHT } from 'util/constants'
import { NoteLine } from 'assets/notes'
import {
  getMiddleC,
  getCore,
  getHook,
  getCoreOffset,
  makeEven,
  shouldBeFacingBottom,
  getNoteWidth,
  getHookHeight,
} from './utils'
import { Base } from './styles'

const BASE_LINE_HEIGHT = 70

const enhance = compose(
  withPropsOnChange(['scale'], ({ data: note, scale }) => {
    if (!note || note.type === 'pause') return
    const { clef, size, data } = note
    const middleC = getMiddleC(clef, scale)
    let topCoreOffset = BASE_HEIGHT
    let bottomCoreOffset = 0
    let cores = []
    data.forEach(({ position }) => {
      const Core = {}
      Core.svg = getCore(size)
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
      Core.height = makeEven(10 * scale) * 2
      cores.push(Core)
    })
    const Line = {}
    Line.svg = size > 1 && NoteLine
    Line.hook = size > 4 && getHook(size)
    const proposedHeight = bottomCoreOffset - topCoreOffset + 50 * scale
    const baseHeight = BASE_LINE_HEIGHT * scale
    Line.height =
      (proposedHeight > baseHeight ? proposedHeight : baseHeight) +
      (size / 2) * scale
    if (
      shouldBeFacingBottom({
        clef,
        scale,
        offsets: { bottomCoreOffset, topCoreOffset },
      })
    ) {
      Line.offsetY = topCoreOffset + 11 * scale
      Line.offsetX = -Math.floor(getNoteWidth(size) / 2 - 1) * scale
      Line.hookX = Line.offsetX - 7 * scale
      Line.hookRotate = 180
      Line.hookY = Line.offsetY + Line.height - getHookHeight(size) * scale
    } else {
      Line.offsetY = bottomCoreOffset + 10 * scale - Line.height
      Line.offsetX = Math.floor(getNoteWidth(size) / 2 - 2) * scale
      Line.hookX = Line.offsetX + 8 * scale
      Line.hookRotate = 0
      Line.hookY = Line.offsetY
    }
    return {
      cores,
      Line,
    }
  })
)

const Note = enhance(({ offset, scale, cores = [], Line = {} }) => (
  <Base
    offset={offset}
    width={Math.floor(BASE_NOTE_WIDTH * scale)}
    height={Math.floor((BASE_HEIGHT / 2) * scale)}>
    {cores.map(Core => (
      <Core.svg
        key={Core.offsetY}
        x={Core.offsetX || 0}
        y={Core.offsetY}
        height={Core.height}
      />
    ))}
    {Line.svg && (
      <Line.svg
        y={Line.offsetY}
        x={Line.offsetX}
        height={Line.height}
        width={3 * scale}
      />
    )}
    {Line.hook && (
      <Line.hook
        y={Line.hookY}
        x={Line.hookX}
        width={16 * scale}
        rotate={Line.hookRotate}
      />
    )}
  </Base>
))

export default Note
