import React, { Fragment } from 'react'
import { compose } from 'recompose'
import withPlayer from 'enhancers/withPlayer'
import withConsumer from 'enhancers/withConsumer'
import withMIDI from 'enhancers/withMIDI'

import Staff from 'components/Staff'
import Displayer from 'containers/Displayer'
import { Pressed } from 'containers/PianoProvider'
import { Container } from 'react-pixi-fiber'

const enhance = compose(
  withPlayer,
  withMIDI
)

const Player = enhance(({ notes, clefs, scaled, pressedKeys }) => {
  // console.log('pressedKeys', pressedKeys)
  return (
    <Fragment>
      <Container>
        <Staff {...scaled} />
        <Displayer
          clef="treble"
          data={notes?.treble}
          offset={clefs.getIn(['treble', 'offset'])}
          {...scaled}
        />
      </Container>
      <Container y={scaled.height / 2}>
        <Staff {...scaled} />
        <Displayer
          clef="bass"
          data={notes?.bass}
          offset={clefs.getIn(['bass', 'offset'])}
          {...scaled}
        />
      </Container>
    </Fragment>
  )
})

export default Player
