import React from 'react'

import { Background, Container, StaffLine } from './styles'

const Note = ({ children }) => (
  <Background>
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

export default Note
