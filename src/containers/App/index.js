import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { randomizeTreble, randomizeBass } from '../../store/actions'
import analyseAudio from '../../util/audio'
import Section from '../Section'
import Settings from '../Settings'

class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
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
      this.props.dispatch(randomizeTreble())
      this.props.dispatch(randomizeBass())
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
