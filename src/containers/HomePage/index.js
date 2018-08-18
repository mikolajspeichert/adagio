import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Midi from 'util/Midi'

import Staff from 'components/Staff'
import BaseNote from 'components/BaseNote'
import Paper, { Scaled } from 'components/Paper'

class HomePage extends Component {
  componentDidMount() {
    navigator.requestMIDIAccess &&
      navigator.requestMIDIAccess().then(
        input => {
          // new Midi(input, note => {}).analyseInputs()
        },
        e => console.error(e)
      )
  }

  render() {
    return (
      <div>
        <Paper>
          <Scaled>{({ scale }) => console.log(scale)}</Scaled>
        </Paper>
      </div>
    )
  }
}

export default HomePage
