// components/Rectangle.js
import { CustomPIXIComponent } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

const TYPE = 'Rectangle'
export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps(instance, oldProps, newProps) {
    const { x, y, width, height } = newProps
    instance.clear()
    instance.beginFill(0x343434, 0.15)
    instance.drawRect(x, y, width, height)
    instance.endFill()
  },
}
export default CustomPIXIComponent(behavior, TYPE)
