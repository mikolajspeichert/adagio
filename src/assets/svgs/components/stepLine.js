import React from 'react'

const StepLine = props => (
  <svg width={3} height={20} {...props}>
    <path
      d="M1 20V0"
      stroke="#000"
      strokeWidth={4}
      fill="#000"
      fillRule="nonzero"
      strokeLinecap="round"
      strokeLinejoin="bevel"
    />
  </svg>
)

export default StepLine
