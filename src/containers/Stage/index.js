import React from 'react'
import {
  compose,
  withState,
  lifecycle,
  withHandlers,
  withPropsOnChange,
  setDisplayName,
} from 'recompose'
import PropTypes from 'prop-types'
import { Stage as PixiStage, Container } from 'react-pixi-fiber'

import { colors } from 'styled/themes/index'
import { BASE_HEIGHT, BASE_WIDTH } from 'util/constants'
import Staff from 'components/Staff'
import Displayer from 'containers/Displayer'
import { ScreenWrapper, Paper, StageOptions } from './styles'
import Player from 'containers/Player'

const ScaleProvider = React.createContext({
  scale: 1.0,
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
})

const enhance = compose()

const Stage = enhance(({ scaled, offsets, children }) => (
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
