import React, { Fragment } from 'react'
import { compose } from 'recompose'
import withPlayer from 'enhancers/withPlayer'
import Staff from 'components/Staff'
import Displayer from 'containers/Displayer'
import { Scaled } from 'components/Paper'

const enhance = compose(withPlayer)

const Player = enhance(({ notes }) => (
  <Scaled>
    {({ scale }) => (
      <Fragment>
        <Staff scale={scale}>
          <Displayer data={notes?.treble} />
        </Staff>
        <Staff scale={scale}>
          <Displayer data={notes?.bass} />
        </Staff>
      </Fragment>
    )}
  </Scaled>
))

export default Player
