import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { generateNotes, generateNoteFor } from '../../store/actions'
import analyseAudio, { isCloseEnough } from '../../util/audio'
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
    this.success = ''
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
      this.success = 'success'
    }
    if (e.key === 'Tab') {
      this.props.dispatch(generateNoteFor('bass'))
    }
  }

  handleAudioInput = stream => {
    analyseAudio(stream, pitch => {
      //  console.log(pitch / 10)
      //  console.log('Current normal frequencies: ', this.props.frequencies)
      this.props.clefs.forEach(clef => {
        let { flat, natural, sharp } = this.props.frequencies[clef]
        if (isCloseEnough(pitch, natural, sharp, flat)) generateNoteFor(clef)
      })
    })
  }

  render() {
    return (
      <div className={`app ${this.success}`}>
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
  frequencies: PropTypes.shape({
    treble: PropTypes.object,
    bass: PropTypes.object,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  clefs: state.clefs,
  frequencies: state.audio,
})

export default connect(mapStateToProps)(App)
