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

import { colors } from 'styled/themes'
import { BASE_HEIGHT, BASE_WIDTH } from 'util/constants'
import { ScreenWrapper, PaperStage } from './styles'

const ScaleProvider = React.createContext({
  scale: 1.0,
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
})

const enhance = compose(
  setDisplayName('Paper'),
  withState('dimensions', 'setDimensions', [
    window.innerWidth,
    window.innerHeight,
  ]),
  withHandlers({
    calculateDimensions: ({ setDimensions }) => () => {
      setDimensions([window.innerWidth, window.innerHeight])
    },
  }),
  withPropsOnChange(['dimensions'], ({ dimensions, width, height }) => {
    const [windowWidth, windowHeight] = dimensions

    let targetWidth
    let targetHeight
    let targetScale
    if (height / width > windowHeight / windowWidth) {
      targetHeight = windowHeight
      targetWidth = (targetHeight * width) / height
      targetScale = windowHeight / height
    } else {
      targetWidth = windowWidth
      targetHeight = (targetWidth * height) / width
      targetScale = windowWidth / width
    }
    const offsets = {
      x: Math.floor((windowWidth - targetWidth) / 2),
      y: Math.floor((windowHeight - targetHeight) / 2),
    }
    return {
      height: targetHeight,
      width: targetWidth,
      scale: targetScale,
      offsets,
    }
  }),
  lifecycle({
    componentDidMount() {
      const { calculateDimensions } = this.props
      window.addEventListener('resize', calculateDimensions)
    },
    componentWillUnmount() {
      const { calculateDimensions } = this.props
      window.removeEventListener('resize', calculateDimensions)
    },
  })
)

const Paper = enhance(({ height, width, scale, offsets, children }) => (
  <ScreenWrapper>
    <PaperStage height={height} offsets={offsets}>
      <ScaleProvider.Provider value={{ scale, width, height }}>
        {children}
      </ScaleProvider.Provider>
    </PaperStage>
  </ScreenWrapper>
))

Paper.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

Paper.defaultProps = {
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
}

export const Scaled = ScaleProvider.Consumer
export default Paper
