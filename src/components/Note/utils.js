import { Body1, Body2, Body4, hooks } from 'assets/notes'
import { BASE_HEIGHT } from 'util/constants'

const makeEven = number =>
  Math.floor(number) % 2 === 1 ? Math.floor(number) + 1 : Math.floor(number)

const getMargin = scale => makeEven(scale * 10)

const isTreble = clef => clef === 'treble'

const shouldBeFacingBottom = ({ clef, offsets, scale }) => {
  const middle = Math.floor((BASE_HEIGHT * scale) / 4)
  const topDifference = middle - offsets.topCoreOffset
  const bottomDifference = middle - offsets.bottomCoreOffset
  if (isTreble(clef)) {
    return topDifference > -bottomDifference
  }
  return bottomDifference < -topDifference
}

const getMiddleC = (clef, scale) => {
  const lineThickness = Math.ceil(scale)
  const startingPoint = Math.floor((BASE_HEIGHT * scale) / 4) + lineThickness
  const margin = getMargin(scale)
  let moveByRatio
  let linesQuantity
  if (isTreble(clef)) {
    moveByRatio = 2.5
    linesQuantity = 2
  } else {
    moveByRatio = -3.5
    linesQuantity = -3
  }
  return (
    startingPoint + moveByRatio * margin * 2 + linesQuantity * lineThickness
  )
}

const getHook = size => (size < 8 ? null : hooks[`Hook${size}`])

const getCore = size => (size === 1 ? Body1 : size === 2 ? Body2 : Body4) // eslint-disable-line no-nested-ternary

const getCoreOffset = ({ middleC, position, scale }) =>
  middleC -
  position * getMargin(scale) -
  Math.floor(position / 2) * Math.ceil(scale)

const getNoteWidth = size => (size === 1 ? 36 : 25)

const hooksHeights = {
  8: 50,
  16: 59,
  32: 72,
  64: 89,
  128: 113,
}

const getHookHeight = size => hooksHeights[size]

export {
  getMiddleC,
  getCore,
  getHook,
  getHookHeight,
  getCoreOffset,
  makeEven,
  isTreble,
  getNoteWidth,
  shouldBeFacingBottom,
}
