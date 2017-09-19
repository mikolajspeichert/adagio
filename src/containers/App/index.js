import React, { Component } from 'react'
import Section from '@components/Section'
import Settings from '@containers/Settings'
import './style.css'

class App extends Component {
  handleRandomize = () => {}

  render() {
    return (
      <div className="app" onKeyPress={this.handleRandomize}>
        <Section />
        <Section />
        <Section />
        <Settings />
      </div>
    )
  }
}

export default App
