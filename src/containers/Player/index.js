import React, { Fragment } from 'react'
import { compose } from 'recompose'
import withPlayer from 'enhancers/withPlayer'
import withConsumer from 'enhancers/withConsumer'
import withMIDI from 'enhancers/withMIDI'
import { Stage as PixiStage, Container } from 'pixi-in-react'
import Staff from 'components/Staff'
import Displayer from 'containers/Displayer'
import { Paper, ScreenWrapper } from 'containers/Stage/styles'

const enhance = compose(
  withPlayer,
  withMIDI
)
const StageOptions = {
  backgroundColor: 0xf7f4ef,
}

const Player = enhance(({ notes, clefs, scaled, correctNotes, wrongNotes }) => (
  <PixiStage width={scaled.width} height={scaled.height} options={StageOptions}>
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
  </PixiStage>
))

export default Player
