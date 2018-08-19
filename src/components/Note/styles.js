import styled from 'styled-components'
import P8 from 'assets/svgs/components/body4'

const Base = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
`

const Pause8 = styled(P8)`transform: translateY(107px);`

export { Base, Pause8 }
