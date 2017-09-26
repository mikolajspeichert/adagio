import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.css'

class Picker extends Component {
  handleClick(option) {
    let { selected, multipleChoice, onAction } = this.props
    if (selected.includes(option)) {
      if (multipleChoice) selected.splice(selected.indexOf(option), 1)
    } else if (multipleChoice) selected.push(option)
    else selected = [option]
    onAction(selected)
  }

  render() {
    const { options, selected } = this.props
    return (
      <div className="picker">
        {options.map(option => {
          let isSelected = selected.includes(option)
            ? 'picker-item selected'
            : 'picker-item'
          return (
            <div
              className={isSelected}
              onClick={() => this.handleClick(option)}>
              {option}
            </div>
          )
        })}
      </div>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.array,
  multipleChoice: PropTypes.bool,
  onAction: PropTypes.func.isRequired,
}

Picker.defaultProps = {
  multipleChoice: false,
  selected: [],
}

export default Picker
