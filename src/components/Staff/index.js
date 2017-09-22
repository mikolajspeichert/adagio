import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import assets from '../../assets'
import './style.css'

class Staff extends PureComponent {
  render() {
    const { clef, viewBox } = this.props
    const asset = clef === 'treble' ? assets.notes.treble : assets.notes.bass
    return (
      <svg
        className={`staff ${clef}`}
        viewBox={viewBox}
        preserveAspectRatio="none">
        <use xlinkHref={`${asset}#staff`} />
      </svg>
    )
  }
}

Staff.propTypes = {
  clef: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired,
}

export default Staff
