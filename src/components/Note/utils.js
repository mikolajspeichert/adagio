import { bodies, hooks, pauses, LedgerLine } from 'assets/notes'
import {
  BASE_HEIGHT,
  STAFF_LINE_SPACING,
  STAFF_LINE_THICKNESS,
  DEFAULT_PAUSE_SPACING,
} from 'util/constants'
import { Sprite } from 'pixi-in-react'
import * as PIXI from 'pixi.js'
import React from 'react'

const hooksHeights = {
  8: 50,
  16: 59,
  32: 72,
  64: 89,
  128: 113,
}

const pauseHeights = {
  1: 9,
  2: 9,
  4: 54,
  8: 37,
  16: 55,
  32: 77,
  64: 102,
  128: 135,
}

const NoteElement = ({ texture, color = 0x000000, ...props }) => {
  return (
    <Sprite texture={PIXI.Texture.fromImage(texture)} tint={color} {...props} />
  )
}

const getStaffSpacing = scale => STAFF_LINE_SPACING * scale

const isTreble = clef => clef === 'treble'

const getDifferences = (scale, offsets) => {
  const middle = Math.floor((BASE_HEIGHT * scale) / 4)
  return {
    top: middle - offsets.top,
    bottom: middle - offsets.bottom,
  }
}

const shouldBeFacingBottom = ({ clef, offsets, scale }) => {
  const differences = getDifferences(scale, offsets)
  if (isTreble(clef)) {
    return differences.top > -differences.bottom
  }
  return differences.bottom > -differences.top
}

const getSubPauseOffset = (scale, offsets, size) => {
  const differences = getDifferences(scale, offsets)
  return differences.top > -differences.bottom
    ? differences.top - (pauseHeights[size] + DEFAULT_PAUSE_SPACING) * scale
    : differences.bottom + DEFAULT_PAUSE_SPACING * scale
}

const getMiddleC = (clef, scale) => {
  const lineThickness = STAFF_LINE_THICKNESS(scale)
  const startingPoint = Math.floor((BASE_HEIGHT * scale) / 4)
  const spacing = getStaffSpacing(scale)
  let moveByRatio
  let linesQuantity
  if (isTreble(clef)) {
    moveByRatio = 2.5
    linesQuantity = 3
  } else {
    moveByRatio = -3.5
    linesQuantity = -3
  }
  return startingPoint + moveByRatio * spacing + linesQuantity * lineThickness
}

const getHook = size => (size < 8 ? null : hooks[size])

const getPause = size => pauses[size]

const getLedger = () => LedgerLine

const clefLedgerBorders = {
  bass: {
    top: -1,
    bottom: -11,
  },
  treble: {
    top: 11,
    bottom: 1,
  },
}

const getLedgerPositions = (clef, corePosition) => {
  const positions = []
  if (corePosition > clefLedgerBorders[clef].top) {
    let ledger = clefLedgerBorders[clef].top + 1
    while (ledger <= corePosition) {
      positions.push(ledger)
      ledger += 2
    }
  } else if (corePosition < clefLedgerBorders[clef].bottom) {
    let ledger = clefLedgerBorders[clef].bottom - 1
    while (ledger >= corePosition) {
      positions.push(ledger)
      ledger -= 2
    }
  }
  return positions
}

const getCore = size => (size < 4 ? bodies[size] : bodies[4])

const getOffset = ({ middleC, position, scale }) =>
  middleC -
  (position * getStaffSpacing(scale)) / 2 -
  Math.floor(position / 2) * STAFF_LINE_THICKNESS(scale)

const getNoteWidth = size => (size === 1 ? 35 : 24)

const getPauseWidth = size => (size < 16 ? 20 : (Math.log2(size) + 1) * 5)

export {
  NoteElement,
  getMiddleC,
  getCore,
  getHook,
  getPause,
  getLedger,
  getOffset,
  getSubPauseOffset,
  getLedgerPositions,
  isTreble,
  getNoteWidth,
  getPauseWidth,
  shouldBeFacingBottom,
  pauseHeights,
}
