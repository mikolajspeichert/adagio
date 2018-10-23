import React, { Fragment } from 'react'
import { compose, lifecycle } from 'recompose'

import withTrack from 'enhancers/withTrack'

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
    <Title>{track.meta.name}</Title>
    <Stage />
  </Fragment>
))

export default App
