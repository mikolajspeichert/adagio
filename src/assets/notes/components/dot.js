import React from 'react'
import { Svg } from '../styles'

const Dot = props => (
  <Svg width={8} height={8} {...props}>
    <path
      d="M1.172 6.824C.392 6.044 0 5.102 0 4c0-1.105.392-2.048 1.172-2.828C1.952.388 2.895 0 4 0c1.102 0 2.044.388 2.828 1.172C7.608 1.952 8 2.895 8 4c0 1.102-.392 2.044-1.172 2.824C6.044 7.608 5.102 7.996 4 7.996c-1.105 0-2.048-.388-2.828-1.172"
      fill="#000"
      fillRule="nonzero"
    />
  </Svg>
)

export default Dot
