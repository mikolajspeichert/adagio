import styled from 'styled-components'

const Base = styled.div.attrs({
  style: ({ offset = 0 }) => ({
    transform: `translate(${offset}px, 0px)`,
  }),
})`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
`

const styledItem = svg => styled(svg).attrs({
  style: ({ x = 0, y = 0, rotate = 0}) => ({
    transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
  }),
})`
  position: absolute;
`

export { Base, styledItem }
