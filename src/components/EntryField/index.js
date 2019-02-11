import React from 'react'
import { Custom } from 'pixi-in-react'

const EntryField = props => {
  return (
    <Custom
      type="Graphics"
      {...props}
      behavior={{
        applyProps: (instance, { x, y, width, height }) => {
          instance.clear()
          instance.beginFill(0x343434, 0.15)
          instance.drawRect(x, y, width, height)
          instance.endFill()
        },
      }}
    />
  )
}

export default EntryField
