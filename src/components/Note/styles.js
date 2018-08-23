import styled from 'styled-components'

const Base = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
`

const styledItem = svg => styled(svg).attrs({
  style: ({ x, y }) => ({
    transform: `translate(${x}px, ${y}px)`,
  }),
})`
  position: absolute;
`

export { Base, styledItem }
