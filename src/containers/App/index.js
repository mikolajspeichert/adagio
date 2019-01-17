import React, { Fragment } from 'react'
import { compose, lifecycle } from 'recompose'

import withTrack from 'enhancers/withTrack'
import GlobalStyles from 'styled/utils/global-styles'

import Stage from 'containers/Stage'
import Title from 'components/Title'

const enhance = compose(
  withTrack,
  lifecycle({
    componentDidMount() {
      const { fetchTrack } = this.props
      fetchTrack('prelude')
    },
    componentWillUnmount() {},
  })
)

const App = enhance(({ track }) => (
  <Fragment>
    <GlobalStyles />
    <Title>{track.meta.name}</Title>
    <Stage />
  </Fragment>
))

export default App
