import React from 'react'
import { compose, withPropsOnChange } from 'recompose'
import { Sprite, Container } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

import {
  BASE_NOTE_WIDTH,
  BASE_HEIGHT,
  STAFF_LINE_SPACING,
  STAFF_LINE_THICKNESS,
} from 'util/constants'
import { NoteLine } from 'assets/notes'
import {
  NoteElement,
  getMiddleC,
  getCore,
  getHook,
  getCoreOffset,
  shouldBeFacingBottom,
  getNoteWidth,
} from './utils'

import { c } from './stub'

const BASE_LINE_HEIGHT = 70

const enhance = compose(
  withPropsOnChange(['scale'], ({ data: note, scale }) => {
    if (!note || note.type === 'pause') return
    const { clef, size, data } = note
    const middleC = getMiddleC(clef, scale)
    let topCoreOffset = BASE_HEIGHT
    let bottomCoreOffset = 0
    let cores = []
    data.forEach(({ position, size: coreSize }) => {
      const Core = {}
      Core.svg = getCore(coreSize)
      Core.offsetY = getCoreOffset({ middleC, position, scale })
      if (Core.offsetY > bottomCoreOffset) bottomCoreOffset = Core.offsetY
      if (Core.offsetY < topCoreOffset) topCoreOffset = Core.offsetY
      Core.width = getNoteWidth(coreSize) * scale
      if (
        data.some(otherNote => otherNote.position + 1 === position) &&
        !data.some(otherNote => otherNote.position - 1 === position)
      ) {
        Core.offsetX = Core.width
      }
      Core.height = STAFF_LINE_SPACING * scale
      cores.push(Core)
    })
    const Line = {}
    Line.svg = size > 1 && NoteLine
    if (note.type === 'mixed') {
      let hookSize = data.filter(subNote => subNote.type === 'note')[0].size
      Line.hook = hookSize > 4 && getHook(hookSize)
    } else {
      Line.hook = size > 4 && getHook(size)
    }
    const proposedHeight = bottomCoreOffset - topCoreOffset + 50 * scale
    const baseHeight = BASE_LINE_HEIGHT * scale
    Line.height =
      (proposedHeight > baseHeight ? proposedHeight : baseHeight) +
      (size / 2) * scale
    Line.width = STAFF_LINE_THICKNESS(scale) + 1
    if (
      shouldBeFacingBottom({
        clef,
        scale,
        offsets: { bottomCoreOffset, topCoreOffset },
      })
    ) {
      Line.offsetY = topCoreOffset + 11 * scale
      Line.offsetX = 0
      Line.hookX = Line.offsetX + Line.width
      Line.hookRotate = 3.14
      Line.hookY = Line.offsetY + Line.height
    } else {
      Line.offsetY = bottomCoreOffset + 10 * scale - Line.height
      Line.offsetX = Math.floor(getNoteWidth(size) * scale) - Line.width
      Line.hookX = Line.offsetX
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
  <Container x={offset}>
    {cores.map(Core => (
      <NoteElement
        svg={Core.svg}
        key={Core.offsetY}
        x={Core.offsetX || 0}
        y={Core.offsetY}
        height={Core.height}
        width={Core.width}
      />
    ))}
    {Line.svg && (
      <NoteElement
        svg={Line.svg}
        y={Line.offsetY}
        x={Line.offsetX}
        height={Line.height}
        width={Line.width}
      />
    )}
    {Line.hook && (
      <NoteElement
        svg={Line.hook}
        y={Line.hookY}
        x={Line.hookX}
        width={16 * scale}
        skew={new PIXI.Point(Line.hookRotate, Line.hookRotate)}
      />
    )}
  </Container>
))

export default Note
