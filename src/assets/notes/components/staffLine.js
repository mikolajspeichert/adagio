import React from 'react'
import styled from 'styled-components'

const getMargin = scale =>
  Math.floor(scale * 10) % 2 === 1
    ? Math.floor(scale * 10) + 1
    : Math.floor(scale * 10)

const StaffLine = styled.div`
  width: 100%;
  height: ${({ scale }) => Math.ceil((scale * 2 + 1) / 2)}px;
  background-color: black;
  margin: ${({ scale }) => getMargin(scale)}px 0;
`

export default StaffLine
