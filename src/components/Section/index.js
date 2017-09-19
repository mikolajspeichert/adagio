import React, { Component } from 'react'

class Section extends Component {
  render() {
    const { dimensions, urls } = this.props
    return (
      <div className="section">
        <div className="treble" />
        <div className="bass" />
      </div>
    )
  }
}

export default Section
