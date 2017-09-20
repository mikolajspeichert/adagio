import React, { Component } from 'react'
import './style.css'

class Cell extends Component {
  render() {
    return (
      <div className={`cell ${this.props.color}`}>{this.props.children}</div>
    )
  }
}

export default Cell
