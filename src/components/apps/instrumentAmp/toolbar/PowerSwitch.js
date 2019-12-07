import React, { Component } from 'react'
import '../../../../styles/instrumentAmp/instrumentAmp.scss'
import Switch from '../../../gui/Switch'

class PowerSwitch extends Component {
  constructor (props) {
    super(props)
    this.height = 64
    this.width = 64
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.toggleAudioState()
  }

  render () {
    // Switch props
    let id = 'powerSwitch'
    let src = '' // add src switch image
    let value = 0
    let defvalue = 0
    let width = 64 // css-able?
    let height = 64 // css-able?
    let type = 'toggle'
    let group = null
    let invert = 0
    let tooltip = null
    let enable = 1
    let outline = 1
    let midilearn = null
    let midicc = null

    return (
      <Switch
        onClick={this.handleClick}
        id={id}
        src={src}
        value={value}
        defvalue={defvalue}
        width={width}
        height={height}
        type={type}
        group={group}
        invert={invert}
        tooltip={tooltip}
        enable={enable}
        outline={outline}
        midilearn={midilearn}
        midicc={midicc} />
    )
  }
}

export default PowerSwitch
