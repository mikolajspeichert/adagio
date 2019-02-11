import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'

import { BASE_HEIGHT, BASE_WIDTH } from 'util/constants'
import withDimensions from 'enhancers/withDimensions'

import withPlayer from 'enhancers/withPlayer'
import withMIDI from 'enhancers/withMIDI'
import Player from '../Player'
import { ScreenWrapper, Paper } from './styles'

const ScaleProvider = React.createContext({
  scale: 1.0,
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
})

// const enhance = compose(
//   withDimensions,
//   withPlayer,
//   withMIDI
// )

const Displayer = ({ scaled, offsets, ...props }) => {
  console.log()
  
  return (
    <ScreenWrapper>
      <Paper height={scaled.height} offsets={offsets}>
        <Player scaled={scaled} {...props} />
      </Paper>
    </ScreenWrapper>
  )
}

// Displayer.propTypes = {
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired,
// }

// Displayer.defaultProps = {
//   width: BASE_WIDTH,
//   height: BASE_HEIGHT,
// }

export const Scaled = ScaleProvider.Consumer
export default Displayer
