import { Body1, Body2, Body4 } from 'assets/svgs'
import { BASE_HEIGHT } from 'util/constants'

const makeEven = number =>
  Math.floor(number) % 2 === 1 ? Math.floor(number) + 1 : Math.floor(number)

const getMargin = scale => makeEven(scale * 10)

const getMiddleC = (clef, scale) => {
  const lineThickness = Math.ceil(scale)
  const startingPoint = Math.floor((BASE_HEIGHT * scale) / 4) + lineThickness
  const margin = getMargin(scale)
  let moveByRatio
  let linesQuantity
  if (clef === 'treble') {
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

const getCore = size => (size === 1 ? Body1 : size === 2 ? Body2 : Body4) // eslint-disable-line no-nested-ternary

export { getMiddleC, getCore, getMargin, makeEven }
