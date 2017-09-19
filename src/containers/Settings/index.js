import React, { Component } from 'react'
import assets from '../../assets'
import './style.css'

class Settings extends Component {
  render() {
    var { hidden } = this.props
    return (
      <div className="settings">
        <div className="handle">
          <img src={assets.icons.settings} alt="settings" />
        </div>
        {!hidden && (
          <div className="drawer">
            <p>tekst</p>
          </div>
        )}
      </div>
    )
  }
}

export default Settings
