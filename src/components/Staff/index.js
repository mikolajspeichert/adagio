import React from 'react'

import { BASE_HEIGHT } from 'util/constants'
import { Background, Container, StaffLine } from './styles'

const Staff = ({ children, scale }) => (
  <Background height={Math.floor((BASE_HEIGHT / 2) * scale)}>
    <Container>
      <StaffLine scale={scale} />
      <StaffLine scale={scale} />
      <StaffLine scale={scale} />
      <StaffLine scale={scale} />
      <StaffLine scale={scale} />
    </Container>
    <Container>{children}</Container>
  </Background>
)

export default Staff
