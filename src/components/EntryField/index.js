import React from 'react'
import styled from 'styled-components'
import { colors } from 'styled/themes'

const EntryField = styled.div`
  background-color: ${colors.alphaGray};
  position: absolute;
  left: ${({ offset }) => `${offset}px`};
  height: 100%;
  width: ${({ width }) => `${width}px`};
`

export default EntryField
