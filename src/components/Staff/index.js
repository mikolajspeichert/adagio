import React from 'react'

import { BASE_HEIGHT } from 'util/constants'
import { Background, Container, StaffLine } from './styles'

const Staff = ({ children, scale }) => (
  <Background height={Math.floor((BASE_HEIGHT / 2) * scale)}>
    <Container>
      <StaffLine />
      <StaffLine />
      <StaffLine />
      <StaffLine />
      <StaffLine />
    </Container>
    <Container>{children}</Container>
  </Background>
)

export default Staff
