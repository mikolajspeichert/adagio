import React, { Component } from 'react'
import Section from '../../components/Section'
import Settings from '../Settings'

class App extends Component {
  handleRandomize = () => {}

  render() {
    return (
      <div className="app" onKeyPress={this.handleRandomize}>
        <Section color={['blue', 'green']} />
        <Section color={['red', 'blue']} />
        <Section color={['green', 'red']} />
        <Settings />
      </div>
    )
  }
}

export default App
