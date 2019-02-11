import { compose, withState, lifecycle, withHandlers, withPropsOnChange, setDisplayName } from 'recompose'

import { BASE_HEIGHT, BASE_WIDTH } from 'util/constants'

const withDimensions = compose(
  setDisplayName('withDimensions'),
  withState('dimensions', 'setDimensions', [window.innerWidth, window.innerHeight]),
  withHandlers({
    calculateDimensions: ({ setDimensions }) => () => {
      setDimensions([window.innerWidth, window.innerHeight])
    },
  }),
  withPropsOnChange(['dimensions'], ({ dimensions, width = BASE_WIDTH, height = BASE_HEIGHT }) => {
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
      scaled: {
        height: targetHeight,
        width: targetWidth,
        scale: targetScale,
      },
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

export default withDimensions
