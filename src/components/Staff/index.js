import React, { Fragment } from 'react'
import { Sprite } from 'pixi-in-react'
import * as PIXI from 'pixi.js'
import { STAFF_LINE_SPACING, STAFF_LINE_THICKNESS } from 'util/constants'
import { StaffLine as StaffSvg } from 'assets/notes'

const StaffLine = ({ height, order, scale, ...props }) => {
  const lineThickness = STAFF_LINE_THICKNESS(scale)
  const center = Math.floor(height / 4)
  const y = center - (3 - order) * (STAFF_LINE_SPACING * scale + lineThickness)
  return (
    <Sprite
      height={lineThickness}
      texture={PIXI.Texture.fromImage(StaffSvg)}
      y={y}
      {...props}
    />
  )
}

const Staff = ({ ...scaleAndWidth }) => (
  <Fragment>
    <StaffLine {...scaleAndWidth} order={1} />
    <StaffLine {...scaleAndWidth} order={2} />
    <StaffLine {...scaleAndWidth} order={3} />
    <StaffLine {...scaleAndWidth} order={4} />
    <StaffLine {...scaleAndWidth} order={5} />
  </Fragment>
)
export default Staff
