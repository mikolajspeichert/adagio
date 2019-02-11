import React from 'react'

import Staff from 'components/Staff'
import { Container, Stage as PixiStage } from 'pixi-in-react'
import { useTrackMapper } from 'enhancers/withMIDI/selectors'
import usePlayer from 'hooks/usePlayer'
import useMIDI from 'hooks/useMIDI'
import Notes from '../Notes'

const StageOptions = {
  backgroundColor: 0xf7f4ef,
}

const Player = ({ scaled, track }) => {
  const { bumpIndex, correctNotes, clefs, notes } = usePlayer({
    forTrack: track,
  })
  const midis = useTrackMapper(clefs, track)
  const { wrongNotes } = useMIDI(midis, bumpIndex, track.key)
  return (
    <PixiStage width={scaled.width} height={scaled.height} options={StageOptions}>
      <Container>
        <Staff {...scaled} />
        <Notes
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
        <Notes
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
  )
}

export default Player
