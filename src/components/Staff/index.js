import React, { PureComponent } from 'react'
import assets from '../../assets'
import './style.css'

class Staff extends PureComponent {
  render() {
    const { clef } = this.props
    const asset = clef === 'treble' ? assets.notes.treble : assets.notes.bass
    return (
      <svg className={`single-staff ${clef}`} viewBox="0 0 100 400">
        <use xlinkHref={`${asset}#staff`} />
      </svg>
    )
  }
}

export default Staff
