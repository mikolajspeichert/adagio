import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Midi from 'util/Midi'
import withTrack from 'enhancers/withTrack'

import Staff from 'components/Staff'
import Note from 'components/Note'
import Paper, { Scaled } from 'components/Paper'

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchTrack('moonlight')
    // navigator.requestMIDIAccess &&
    //   navigator.requestMIDIAccess().then(
    //     input => {
    //       // new Midi(input, note => {}).analyseInputs()
    //     },
    //     e => console.error(e)
    //   )
  }

  render() {
    return (
      <Paper>
        <Scaled>
          {({ scale }) => (
            <Staff scale={scale}>
              <Note scale={scale}/>
            </Staff>
          )}
        </Scaled>
        <Scaled>{({ scale }) => <Staff scale={scale} />}</Scaled>
      </Paper>
    )
  }
}

export default withTrack(HomePage)
