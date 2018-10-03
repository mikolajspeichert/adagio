import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Midi from 'util/Midi'
import withTrack from 'enhancers/withTrack'

import Paper from 'components/Paper'
import Title from 'components/Title'
import Player from 'containers/Player'

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchTrack('prelude')
    // navigator.requestMIDIAccess &&
    //   navigator.requestMIDIAccess().then(
    //     input => {
    //       // new Midi(input, note => {}).analyseInputs()
    //     },
    //     e => console.error(e)
    //   )
  }

  render() {
    const { track } = this.props
    return (
      <Fragment>
        <Title>{track.meta.name}</Title>
        <Paper>
          <Player />
        </Paper>
      </Fragment>
    )
  }
}

export default withTrack(HomePage)
