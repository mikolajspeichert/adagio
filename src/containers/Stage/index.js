import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import { Stage as PixiStage } from 'react-pixi-fiber'

import { BASE_HEIGHT, BASE_WIDTH } from 'util/constants'
import withDimensions from 'enhancers/withDimensions'
import Player from 'containers/Player'

import { ScreenWrapper, Paper, StageOptions, Button } from './styles'

const ScaleProvider = React.createContext({
  scale: 1.0,
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
})

const enhance = compose(
  withDimensions,
  withState('stopped', 'setStopped', true),
  withHandlers({
    handleStopChange: ({ stopped, setStopped }) => () => {
      setStopped(!stopped)
    },
  })
)

const Stage = enhance(({ scaled, offsets, stopped, handleStopChange }) => (
  <ScreenWrapper>
    <Paper height={scaled.height} offsets={offsets}>
      <PixiStage
        width={scaled.width}
        height={scaled.height}
        options={StageOptions}>
        <Player scaled={scaled} stopped={stopped} />
      </PixiStage>
    </Paper>
    <Button onClick={handleStopChange}>Start/Stop</Button>
  </ScreenWrapper>
))

Stage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

Stage.defaultProps = {
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
}

export const Scaled = ScaleProvider.Consumer
export default Stage
