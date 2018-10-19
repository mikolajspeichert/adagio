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

const Player = enhance(({ notes, indexes, offsets, scaled, pressed }) => (
  <Fragment>
    <Container>
      <Staff {...scaled} />
      <Displayer
        clef="treble"
        data={notes?.treble}
        index={indexes.treble}
        offset={offsets.treble}
        pressed={pressed.keys}
        {...scaled}
      />
    </Container>
    <Container y={scaled.height / 2}>
      <Staff {...scaled} />
      <Displayer
        clef="bass"
        data={notes?.bass}
        index={indexes.bass}
        offset={offsets.bass}
        pressed={pressed.keys}
        {...scaled}
      />
    </Container>
  </Fragment>
))

export default Player
