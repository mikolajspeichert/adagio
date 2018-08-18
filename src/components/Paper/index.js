import React from 'react'
import {
  compose,
  withState,
  lifecycle,
  withHandlers,
  withProps,
  setDisplayName,
} from 'recompose'
import PropTypes from 'prop-types'
import { ScreenWrapper, PaperStage } from './styles'

const ScaleProvider = React.createContext({ scale: 1.0 })

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
  withProps(({ dimensions, width, height }) => {
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
    <PaperStage width={width} height={height} offsets={offsets}>
      <ScaleProvider.Provider value={{ scale }}>
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
  width: 1024,
  height: 576,
}

export const Scaled = ScaleProvider.Consumer
export default Paper
