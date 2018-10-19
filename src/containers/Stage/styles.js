import React from 'react'
import styled from 'styled-components'

import { colors } from 'styled/themes/index'

const ScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Paper = styled.div`
  background-color: ${colors.paper};
  height: ${({ height: x }) => Math.floor(x)}px;
  position: absolute;
  overflow: hidden;
  transform: translate(${({ offsets: { x, y } }) => `${x}px, ${y}px`});
`

const StageOptions = {
  backgroundColor: parseInt(colors.paper, 16),
}

export { ScreenWrapper, Paper, StageOptions }
