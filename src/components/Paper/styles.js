import React from 'react'
import styled from 'styled-components'

import { colors } from 'styled/themes'

const ScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const PaperStage = styled.div`
  background-color: ${colors.paper};
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  position: absolute;
  overflow: hidden;
  transform: translate(${({ offsets: { x, y } }) => `${x}px, ${y}px`});
`

export { ScreenWrapper, PaperStage }
