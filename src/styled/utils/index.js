import { css } from 'styled-components'

const breakpoints = {
  // xl: 1799, // large desktop
  l: 1199, // small desktop
  m: 991, // tablet
  s: 767, // phone
}

// Iterate through the breakpoints and create a media template
const mediaFactory = operator =>
  Object.keys(breakpoints).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (${operator}-width: ${breakpoints[label]}px) {
        ${css(...args)};
      }
    `

    return acc
  }, {})

const media = {
  min: mediaFactory('min'),
  max: mediaFactory('max'),
}

const unselectable = css`
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
`

export { media, breakpoints, unselectable }
