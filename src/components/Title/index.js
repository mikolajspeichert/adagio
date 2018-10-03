import React from 'react'
import styled from 'styled-components'

import { colors, fonts } from 'styled/themes'

const Title = styled.h1`
  font-family: ${fonts.main};
  font-size: 2em;
  font-weight: 400;
  color: ${colors.paper};
  left: 0;
  right: 0;
  text-align: center;
  position: absolute;
  top: 5vh;
`

export default Title
