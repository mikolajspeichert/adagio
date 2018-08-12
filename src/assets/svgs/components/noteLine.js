import React from 'react'

const NoteLine = props => (
  <svg width={2} height={20} {...props}>
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
