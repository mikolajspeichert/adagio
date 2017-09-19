import React, { Component } from 'react'
import './style.css'

class Section extends Component {
  render() {
    const { color, urls } = this.props
    return (
      <div className="section">
        <div className={`treble ${color[0]}`} />
        <div className={`bass ${color[1]}`} />
      </div>
    )
  }
}

export default Section
