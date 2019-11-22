
import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import '../../../../styles/guitarAmp/guitarAmp.scss'

class MasterGain extends Component {
  constructor (props) {
    super(props)
    this.state = {value: 0} // Default gain value
    // Bind callback
    this.handleInput = this.handleInput.bind(this)
  }

  // Setup gain node and set default value. Set as destination in guitarAmp.js
  componentDidMount () {
    this.masterGain = this.props.audioCtx.createGain()
    this.masterGain.gain.setValueAtTime(this.state.value, this.props.audioCtx.currentTime)
    this.props.masterGain.push(this.masterGain)
    this.masterGain.connect(this.props.audioCtx.destination)
  }

  componentDidUpdate () {
    this.masterGain.gain.setValueAtTime(this.state.value, this.props.audioCtx.currentTime)
  }

  // Callback for wrapped event.
  handleInput (e) {
    this.setState({value: e.target.value})
  }

  render () {
    // Knob Props
    let id = 'masterGain'
    let src = ''
    let value = 0
    let defValue = 0
    let min = 0
    let max = 10
    let step = 0.01
    let width = 0
    let height = 0
    let diameter = 64
    let sprites = 0
    let sensitivity = 1
    let valuetip = 1
    let tooltip = null
    let conv = null
    let enable = 1
    let outline = 1
    let midilearn = 0
    let midicc = null

    return (
      <Knob onInput={this.handleInput}
        id={id}
        src={src}
        value={value}
        defvalue={defValue}
        min={min}
        max={max}
        step={step}
        width={width}
        height={height}
        diameter={diameter}
        sprites={sprites}
        sensitivity={sensitivity}
        valuetip={valuetip}
        tooltip={tooltip}
        conv={conv}
        enable={enable}
        outline={outline}
        midilearn={midilearn}
        midicc={midicc} />
    )
  }
}

export default MasterGain
