import React, { Component } from 'react'
import Display from '../Display'
import Settings from '../Settings'

class App extends Component {
  handleRandomize = () => {}

  render() {
    return (
      <div className="app">
        <Display />
        <Settings />
      </div>
    )
  }
}
export default App
