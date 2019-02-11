import React, { Fragment } from 'react'
import { compose, lifecycle } from 'recompose'

import withTrack from 'enhancers/withTrack'
import GlobalStyles from 'styled/utils/global-styles'

import Displayer from 'containers/Displayer'
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
    <Displayer />
  </Fragment>
))

export default App
