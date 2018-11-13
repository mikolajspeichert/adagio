import React from 'react'
import styled from 'styled-components'

import { colors } from 'styled/themes/index'

const ScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Button = styled.button`
  
`

const Paper = styled.div`
  background-color: ${colors.paper};
  height: ${({ height: x }) => Math.floor(x)}px;
  position: absolute;
  overflow: hidden;
  transform: translate(${({ offsets: { x, y } }) => `${x}px, ${y}px`});
`

const StageOptions = {
  backgroundColor: 0xf7f4ef,
}

export { ScreenWrapper, Paper, StageOptions, Button }
