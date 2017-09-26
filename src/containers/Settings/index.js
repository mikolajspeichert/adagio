import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import assets from '../../assets'
import { draw } from '../../store/actions'
import Cell from '../../components/Cell'
import Picker from '../../components/Picker'
import './style.css'

class Settings extends Component {
  render() {
    var { hidden, onDraw } = this.props
    return (
      <div className="settings">
        <div className="handle" onClick={onDraw}>
          <img src={assets.icons.settings} alt="settings" />
        </div>
        {!hidden && (
          <div className="drawer">
            <Cell color="red">
              <p>a</p>
            </Cell>
            <Cell color="blue">
              <Picker
                options={['treble', 'bass']}
                onAction={() => console.log('xd')}
              />
            </Cell>
            <Cell color="green">
              <p>xd</p>
            </Cell>
          </div>
        )}
      </div>
    )
  }
}

Settings.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onDraw: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  hidden: state.hidden,
})

const mapDispatchToProps = dispatch => ({
  onDraw: () => dispatch(draw()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
