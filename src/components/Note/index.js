import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import assets from '../../assets'
import './style.css'

class Note extends PureComponent {
  render() {
    const { clef, type, viewBox } = this.props
    const asset = clef === 'treble' ? assets.notes.treble : assets.notes.bass
    return (
      <svg className={`note ${clef}`} viewBox={viewBox}>
        <use xlinkHref={`${asset}#${type}`} />
      </svg>
    )
  }
}

Note.propTypes = {
  clef: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  viewBox: PropTypes.string.isRequired,
}

export default Note
