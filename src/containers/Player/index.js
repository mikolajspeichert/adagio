import React, { Fragment } from 'react'
import { compose } from 'recompose'
import { Stage, Container } from 'react-pixi-fiber'
import withPlayer from 'enhancers/withPlayer'
import Staff from 'components/Staff'
import Displayer from 'containers/Displayer'
import Paper, { Scaled } from 'components/Paper'
import { BASE_HEIGHT, BASE_WIDTH } from 'util/constants'

const enhance = compose(withPlayer)

const StageOptions = {
  backgroundColor: 0xf7f4ef,
}

const Player = enhance(({ notes, indexes, offsets }) => (
  <Scaled>
    {scaled => {
      const { width, height } = scaled
      return (
        <Stage width={width} height={height} options={StageOptions}>
          <Container>
            <Staff {...scaled} />
            <Displayer
              data={notes?.treble}
              index={indexes.treble}
              offset={offsets.treble}
              {...scaled}
            />
          </Container>
          <Container y={height / 2}>
            <Staff {...scaled} />
            <Displayer
              data={notes?.bass}
              index={indexes.bass}
              offset={offsets.bass}
              {...scaled}
            />
          </Container>
        </Stage>
      )
    }}
  </Scaled>
))

export default Player
