import React, { PureComponent } from 'react'
import assets from '../../assets'
import './style.css'

class Note extends PureComponent {
  render() {
    const { clef, type } = this.props
    const asset = clef === 'treble' ? assets.notes.treble : assets.notes.bass
    return (
      <svg className={`single-note ${clef}`} viewBox="0 0 100 400">
        <use xlinkHref={`${asset}#${type}`} />
      </svg>
    )
  }
}

export default Note
