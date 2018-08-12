import React from 'react'
import styled from 'styled-components'

const StaffLine = props => (
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

const AltStaffLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
  margin: 10px 0;
`

export default AltStaffLine
