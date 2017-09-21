import React, { PureComponent } from 'react'
import assets from '../../assets'
import './style.css'

class Staff extends PureComponent {
  render() {
    const { clef } = this.props
    const asset = clef === 'treble' ? assets.notes.treble : assets.notes.bass
    return (
      <svg className="staff">
        <use xlinkHref={`${asset}#clef}`} />
      </svg>
    )
  }
}

export default Staff
