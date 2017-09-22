import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import assets from '../../assets'
import './style.css'

class Clef extends PureComponent {
  render() {
    const { type, viewBox } = this.props
    const asset = type === 'treble' ? assets.notes.treble : assets.notes.bass
    return (
      <svg className={`clef ${type}`} viewBox={viewBox}>
        <use xlinkHref={`${asset}#clef`} />
      </svg>
    )
  }
}

Clef.propTypes = {
  type: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired,
}

export default Clef
