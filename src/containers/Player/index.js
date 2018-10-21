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

const Player = enhance(({ notes, clefs, scaled, successNotes }) => (
  <Fragment>
    <Container>
      <Staff {...scaled} />
      <Displayer
        clef="treble"
        data={notes?.treble}
        successNote={successNotes.get('treble')}
        successOffset={clefs.getIn(['treble', 'successOffset'])}
        offset={clefs.getIn(['treble', 'offset'])}
        {...scaled}
      />
    </Container>
    <Container y={scaled.height / 2}>
      <Staff {...scaled} />
      <Displayer
        clef="bass"
        data={notes?.bass}
        successNote={successNotes.get('bass')}
        successOffset={clefs.getIn(['bass', 'successOffset'])}
        offset={clefs.getIn(['bass', 'offset'])}
        {...scaled}
      />
    </Container>
  </Fragment>
))

export default Player
