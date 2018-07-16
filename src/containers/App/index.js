import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    this.props.dispatch(generateNotes())
    if (navigator.requestMIDIAccess)
      navigator
        .requestMIDIAccess()
        .then(this.handleMidiInput, e => console.error(e))
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleMidiInput = midi => {}
  // new Midi(midi, note => {
  //   this.props.clefs.map(
  //     clef =>
  //       this.props.midi[clef] === note &&
  //       this.props.dispatch(generateNoteFor(clef))
  //   )
  // }).analyseInputs()

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

  render() {
    return (
      <div className="app">
        <div>
          {/* {this.props.clefs.map(clef => <Section key={clef} clef={clef} />)} */}
        </div>
        <Settings />
      </div>
    )
  }
}

App.propTypes = {
  clefs: PropTypes.array.isRequired,
  // frequencies: PropTypes.shape({
  //   treble: PropTypes.object,
  //   bass: PropTypes.object,
  // }).isRequired,
  midi: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  clefs: state.clefs,
  midi: state.midi,
})

export default connect(mapStateToProps)(App)
