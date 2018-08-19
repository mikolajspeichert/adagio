import React from 'react'
import styled from 'styled-components'

const getMargin = scale =>
  Math.floor(scale * 10) % 2 === 1
    ? Math.floor(scale * 10) + 1
    : Math.floor(scale * 10)

const StaffLineSvg = props => (
  <svg viewBox="0 0 200 1" preserveAspectRatio="none" {...props}>
    <path
      d="M0 2h200"
      stroke="#000"
      fill="none"
      fillRule="evenodd"
      strokeLinejoin="bevel"
    />
  </svg>
)

const StaffLine = styled.div`
  width: 100%;
  height: ${({ scale }) => Math.ceil(scale)}px;
  background-color: black;
  margin: ${({ scale }) => getMargin(scale)}px 0;
`

export default StaffLine
