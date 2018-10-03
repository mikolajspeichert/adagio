import styled from 'styled-components'

const Svg = styled.svg.attrs({
  style: ({ x = 0, y = 0, rotate = 0 }) => ({
    transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
  }),
})`
  position: absolute;
`

export { Svg }
