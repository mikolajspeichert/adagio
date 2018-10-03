import React from 'react'
import { Svg } from '../styles'

const Connector = props => (
  <Svg width={42} height={10} {...props}>
    <path
      d="M1 9C9-1.667 33-1.667 41 9 33 1.889 9 1.889 1 9"
      stroke="#000"
      strokeWidth={0.35}
      fill="#000"
      fillRule="nonzero"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default Connector
