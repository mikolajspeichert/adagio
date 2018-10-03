import React from 'react'
import { Svg } from '../styles'

const StepLine = props => (
  <Svg width={3} height={20} {...props}>
    <path
      d="M1 20V0"
      stroke="#000"
      strokeWidth={4}
      fill="#000"
      fillRule="nonzero"
      strokeLinecap="round"
      strokeLinejoin="bevel"
    />
  </Svg>
)

export default StepLine
