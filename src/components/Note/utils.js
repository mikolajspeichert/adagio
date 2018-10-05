import { Body1, Body2, Body4, hooks } from 'assets/notes'
import {
  BASE_HEIGHT,
  STAFF_LINE_SPACING,
  STAFF_LINE_THICKNESS,
} from 'util/constants'
import { Sprite } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import React from 'react'

const NoteElement = ({ svg, ...props }) => (
  <Sprite texture={PIXI.Texture.fromImage(svg)} {...props} />
)

const getStaffSpacing = scale => STAFF_LINE_SPACING * scale

const isTreble = clef => clef === 'treble'

const shouldBeFacingBottom = ({ clef, offsets, scale }) => {
  const middle = Math.floor((BASE_HEIGHT * scale) / 4)
  const topDifference = middle - offsets.topCoreOffset
  const bottomDifference = middle - offsets.bottomCoreOffset
  if (isTreble(clef)) {
    return topDifference > -bottomDifference
  }
  return bottomDifference > -topDifference
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

const getHook = size => (size < 8 ? null : hooks[`Hook${size}`])

const getCore = size => (size === 1 ? Body1 : size === 2 ? Body2 : Body4) // eslint-disable-line no-nested-ternary

const getCoreOffset = ({ middleC, position, scale }) =>
  middleC -
  (position * getStaffSpacing(scale)) / 2 -
  Math.floor(position / 2) * STAFF_LINE_THICKNESS(scale)

const getNoteWidth = size => (size === 1 ? 35 : 24)

const hooksHeights = {
  8: 50,
  16: 59,
  32: 72,
  64: 89,
  128: 113,
}

export {
  NoteElement,
  getMiddleC,
  getCore,
  getHook,
  getCoreOffset,
  isTreble,
  getNoteWidth,
  shouldBeFacingBottom,
}
