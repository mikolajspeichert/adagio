import React, { PureComponent } from 'react'
import assets from '../../assets'
import './style.css'

class Clef extends PureComponent {
  render() {
    const { type } = this.props
    const asset = type === 'treble' ? assets.notes.treble : assets.notes.bass
    return (
      <svg className="clef">
        <use xlinkHref={`${asset}#clef}`} />
      </svg>
    )
  }
}

export default Clef
