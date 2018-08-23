import React from 'react'

const NoteLine = props => (
  <svg viewBox="0 0 2 20" preserveAspectRatio="none" {...props}>
    <path
      d="M1 20V0"
      stroke="#000"
      strokeWidth={2}
      fill="#000"
      fillRule="nonzero"
      strokeLinecap="round"
      strokeLinejoin="bevel"
    />
  </svg>
)

export default NoteLine
