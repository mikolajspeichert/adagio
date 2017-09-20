import React, { Component } from 'react'
import { connect } from 'react-redux'
import assets from '../../assets'
import { draw } from '../../store/actions'
import Cell from '../../components/Cell'
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
              <p>chuj</p>
            </Cell>
            <Cell color="blue">
              <p>pizda</p>
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

const mapStateToProps = state => ({
  hidden: state.hidden,
})

const mapDispatchToProps = dispatch => ({
  onDraw: () => dispatch(draw()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
