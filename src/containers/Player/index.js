import React, { Fragment } from 'react'
import { compose } from 'recompose'
import withPlayer from 'enhancers/withPlayer'
import withConsumer from 'enhancers/withConsumer'
import withMIDI from 'enhancers/withMIDI'

import Staff from 'components/Staff'
import Displayer from 'containers/Displayer'
import { Container } from 'react-pixi-fiber'

const enhance = compose(
  withPlayer,
  withMIDI
)

const Player = enhance(({ notes, clefs, scaled, correctNotes, wrongNotes }) => (
  <Fragment>
    <Container>
      <Staff {...scaled} />
      <Displayer
        clef="treble"
        data={notes?.treble}
        correctNote={correctNotes.get('treble')}
        wrongNote={wrongNotes.get('treble')}
        correctOffset={clefs.getIn(['treble', 'correctOffset'])}
        offset={clefs.getIn(['treble', 'offset'])}
        {...scaled}
      />
    </Container>
    <Container y={scaled.height / 2}>
      <Staff {...scaled} />
      <Displayer
        clef="bass"
        data={notes?.bass}
        correctNote={correctNotes.get('bass')}
        wrongNote={wrongNotes.get('bass')}
        correctOffset={clefs.getIn(['bass', 'correctOffset'])}
        offset={clefs.getIn(['bass', 'offset'])}
        {...scaled}
      />
    </Container>
  </Fragment>
))

export default Player
