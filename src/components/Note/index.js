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
  getPause,
  getHook,
  getOffset,
  getSubPauseOffset,
  shouldBeFacingBottom,
  getNoteWidth,
  getPauseWidth,
  pauseHeights,
} from './utils'

import { c } from './stub'

const BASE_LINE_HEIGHT = 70

const enhance = compose(
  withPropsOnChange(['scale', 'data'], ({ data: note, scale }) => {
    if (!note) return
    const { clef, size, data } = note
    const middleC = getMiddleC(clef, scale)

    // Line phase
    const offsets = {
      top: BASE_HEIGHT,
      bottom: 0,
    }
    let cores = []
    data
      .sort((a, b) => {
        if (a.type === b.type) return 0
        if (a.type === 'pause') return 1
        return -1
      })
      .forEach(({ type, position, size: coreSize }) => {
        const Core = {}
        if (type === 'pause') {
          Core.svg = getPause(coreSize)
          if (note.data.length === 1) {
            const pPosition = clef === 'treble' ? 6 : -6
            Core.offsetY = getOffset({ middleC, position: pPosition, scale })
          } else {
            Core.offsetY = getSubPauseOffset(scale, offsets, coreSize)
          }
          Core.width = getPauseWidth(coreSize) * scale
          Core.height = pauseHeights[coreSize] * scale
        } else {
          Core.svg = getCore(coreSize)
          Core.offsetY = getOffset({ middleC, position, scale })
          if (Core.offsetY > offsets.bottom) offsets.bottom = Core.offsetY
          if (Core.offsetY < offsets.top) offsets.top = Core.offsetY
          Core.width = getNoteWidth(coreSize) * scale
          if (
            data.some(otherNote => otherNote.position + 1 === position) &&
            !data.some(otherNote => otherNote.position - 1 === position)
          ) {
            Core.offsetX = Core.width
          }
          Core.height = STAFF_LINE_SPACING * scale
        }

        cores.push(Core)
      })
    const Line = {}
    if (note.type !== 'pause') {
      Line.svg = size > 1 && NoteLine
      if (note.type === 'mixed') {
        let hookSize = data.filter(
          subNote => subNote.type === 'note' || subNote.type === 'tied'
        )[0].size
        Line.hook = hookSize > 4 && getHook(hookSize)
      } else {
        Line.hook = size > 4 && getHook(size)
      }
      const proposedHeight = offsets.bottom - offsets.top + 50 * scale
      const baseHeight = BASE_LINE_HEIGHT * scale
      Line.height =
        (proposedHeight > baseHeight ? proposedHeight : baseHeight) +
        (size / 2) * scale
      Line.width = STAFF_LINE_THICKNESS(scale) + 1
      if (
        shouldBeFacingBottom({
          clef,
          scale,
          offsets,
        })
      ) {
        Line.offsetY = offsets.top + 11 * scale
        Line.offsetX = 0
        Line.hookX = Line.offsetX + Line.width
        Line.hookRotate = 3.14
        Line.hookY = Line.offsetY + Line.height
      } else {
        Line.offsetY = offsets.bottom + 10 * scale - Line.height
        Line.offsetX = Math.floor(getNoteWidth(size) * scale) - Line.width
        Line.hookX = Line.offsetX
        Line.hookRotate = 0
        Line.hookY = Line.offsetY
      }
    }
    return {
      cores,
      Line,
    }
  })
)

const Note = enhance(({ offset, scale, cores = [], Line = {}, alpha = 1 }) => (
  <Container x={offset} alpha={alpha}>
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
