import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { randomizeTreble, randomizeBass } from '../../store/actions'
import Section from '../Section'
import Settings from '../Settings'

class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
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
