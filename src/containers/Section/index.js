import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Clef from '../../components/Clef'
import Note from '../../components/Note'
import Staff from '../../components/Staff'
import './style.css'

class Section extends Component {
  render() {
    const { clef, notes } = this.props
    const viewBox = clef === 'treble' ? '0 30 100 340' : '0 40 100 320'
    return (
      <div className={`${clef} section`}>
        <Staff clef={clef} viewBox={viewBox} />
        <Clef type={clef} viewBox={viewBox} />
        <Note clef={clef} type={notes[clef]} viewBox={viewBox} />
      </div>
    )
  }
}

Section.propTypes = {
  clef: PropTypes.string.isRequired,
  notes: PropTypes.shape({
    treble: PropTypes.number,
    bass: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = state => ({
  notes: state.notes,
})

export default connect(mapStateToProps)(Section)
