import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { generateNotes, generateNoteFor } from '../../store/actions'
import analyseAudio from '../../util/audio'
import Section from '../Section'
import Settings from '../Settings'

class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    this.props.dispatch(generateNotes())
    if (navigator.getUserMedia)
      navigator.getUserMedia({ audio: true }, this.handleAudioInput, e =>
        console.log(e)
      )
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    if (e.key === ' ') {
      this.props.dispatch(generateNotes())
    }
    if (e.key === 'Enter') {
      this.props.dispatch(generateNoteFor('treble'))
    }
    if (e.key === 'Tab') {
      this.props.dispatch(generateNoteFor('bass'))
    }
  }

  handleAudioInput = stream => {
    analyseAudio(stream, pitch => {
      console.log(pitch)
    })
  }

  render() {
    return (
      <div className="app">
        <div>
          {this.props.clefs.map(clef => <Section key={clef} clef={clef} />)}
        </div>
        <Settings />
      </div>
    )
  }
}

App.propTypes = {
  clefs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  clefs: state.clefs,
})

export default connect(mapStateToProps)(App)
