import React, { Component, Fragment } from 'react'
import { compose, lifecycle } from 'recompose'

import withTrack from 'enhancers/withTrack'
import withMIDI from 'enhancers/withMIDI'

import Paper from 'components/Paper'
import Title from 'components/Title'
import Player from 'containers/Player'

const enhance = compose(
  withTrack,
  withMIDI,
  lifecycle({
    componentDidMount() {
      const { handleInputs, fetchTrack } = this.props
      handleInputs().then(() => fetchTrack('prelude'))
    },
    componentWillUnmount() {},
  })
)

const App = enhance(({ track }) => (
  <Fragment>
    <Title>{track.meta.name}</Title>
    <Paper>
      <Player />
    </Paper>
  </Fragment>
))

export default App
