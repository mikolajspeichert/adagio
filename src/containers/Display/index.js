import React, { Component } from 'react'
import { connect } from 'react-redux'
import Section from '../../components/Section'
import Clef from '../../components/Clef'
import Note from '../../components/Note'
import Staff from '../../components/Staff'

class Display extends Component {
  render() {
    const { clefs, notes } = this.props
    return (
      <div>
        <Section type="clef">{clefs.map(clef => <Clef type={clef} />)}</Section>
        <Section type="staff">
          {clefs.map(clef => <Staff clef={clef} />)}
        </Section>
        <Section type="note">
          {clefs.map(clef => <Note clef={clef} type={notes[clef]} />)}
        </Section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  clefs: state.clefs,
  notes: state.notes,
})
export default connect(mapStateToProps)(Display)
