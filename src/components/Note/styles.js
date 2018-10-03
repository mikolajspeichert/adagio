import React from 'react'
import styled from 'styled-components'

const Base = styled(({ offset, ...props }) => <div {...props} />).attrs({
  style: ({ offset = 0 }) => ({
    transform: `translate(${offset}px, 0px)`,
  }),
})`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
`

export { Base }
