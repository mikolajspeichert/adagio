import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { Stage as PixiStage } from 'react-pixi-fiber'

import { BASE_HEIGHT, BASE_WIDTH } from 'util/constants'
import withDimensions from 'enhancers/withDimensions'
import Player from 'containers/Player'

import { ScreenWrapper, Paper, StageOptions } from './styles'

const ScaleProvider = React.createContext({
  scale: 1.0,
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
})

const enhance = compose(withDimensions)

const Stage = enhance(({ scaled, offsets }) => (
  <ScreenWrapper>
    <Paper height={scaled.height} offsets={offsets}>
      <PixiStage
        width={scaled.width}
        height={scaled.height}
        options={StageOptions}>
        <Player scaled={scaled} />
      </PixiStage>
    </Paper>
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
