import React, { Component } from 'react'
import './style.css'

class Section extends Component {
  render() {
    const { type, children } = this.props
    return <div className={`${type} section`}>{children}</div>
  }
}

export default Section
