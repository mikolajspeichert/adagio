import React from 'react'
import { Svg } from '../styles'

const NoteLine = props => (
  <Svg viewBox="0 0 2 20" preserveAspectRatio="none" {...props}>
    <path
      d="M1 20V0"
      stroke="#000"
      strokeWidth={2}
      fill="#000"
      fillRule="nonzero"
      strokeLinecap="round"
      strokeLinejoin="bevel"
    />
  </Svg>
)

export default NoteLine
