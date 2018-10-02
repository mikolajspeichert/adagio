import React, { Fragment } from 'react'
import { compose } from 'recompose'
import withPlayer from 'enhancers/withPlayer'
import Staff from 'components/Staff'
import Displayer from 'containers/Displayer'
import { Scaled } from 'components/Paper'

const enhance = compose(withPlayer)

const Player = enhance(({ notes, indexes, offsets }) => (
  <Scaled>
    {({ scale }) => (
      <Fragment>
        <Staff scale={scale}>
          <Displayer
            data={notes?.treble}
            index={indexes.treble}
            offset={offsets.treble}
          />
        </Staff>
        <Staff scale={scale}>
          <Displayer
            data={notes?.bass}
            index={indexes.bass}
            offset={offsets.bass}
          />
        </Staff>
      </Fragment>
    )}
  </Scaled>
))

export default Player
