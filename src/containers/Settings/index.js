import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import assets from '../../assets'
import { draw, changeSettings } from '../../store/actions'
import Cell from '../../components/Cell'
import Picker from '../../components/Picker'
import './style.css'

class Settings extends Component {
  render() {
    var {
      hidden,
      clefs,
      notesSize,
      noteTypes,
      handleDraw,
      handleAction,
    } = this.props
    return (
      <div className="settings">
        <div className="handle" onClick={handleDraw}>
          <img src={assets.icons.settings} alt="settings" />
        </div>
        {!hidden && (
          <div className="drawer">
            <Cell>
              <Picker
                options={['small notes', 'all notes']}
                selected={[notesSize]}
                onAction={selected => handleAction('notesSize', selected)}
              />
            </Cell>
            <Cell>
              <Picker
                options={['treble', 'bass']}
                selected={clefs}
                multipleChoice
                onAction={selected => handleAction('clefs', selected)}
              />
            </Cell>
            <Cell>
              <Picker
                options={['normal', 'sharps', 'flats']}
                selected={noteTypes}
                multipleChoice
                onAction={selected => handleAction('noteTypes', selected)}
              />
            </Cell>
          </div>
        )}
      </div>
    )
  }
}

Settings.propTypes = {
  hidden: PropTypes.bool.isRequired,
  clefs: PropTypes.array.isRequired,
  handleDraw: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  notesSize: PropTypes.string.isRequired,
  noteTypes: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  hidden: state.hidden,
  clefs: state.clefs,
  notesSize: state.notesSize,
  noteTypes: state.noteTypes,
})

const mapDispatchToProps = dispatch => ({
  handleDraw: () => dispatch(draw()),
  handleAction: (key, value) => dispatch(changeSettings(key, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
