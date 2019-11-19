import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Switch extends Component {
  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('click', this.props.onClick)
  }

  render () {
    return (
      <webaudio-switch width='64' height='64' id='powerSwitch' data-active='false' invert='0' outline='0' />
    )
  }
}

export default Switch
