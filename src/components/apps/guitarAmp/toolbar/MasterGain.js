
import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import '../../../../styles/guitarAmp/guitarAmp.scss'
/*
 * TODO: change value of guitaramp.js mastergainnode on change
*/
class MasterGain extends Component {
  constructor (props) {
    super(props)
    this.state = {value: 0} // Default gain value

    // Gain Props
    // this.defaultGainValue = 1
    // Bind callback
    this.handleInput = this.handleInput.bind(this)
  }

  // Setup gain node and set default value. Set as destination in guitarAmp.js
  componentDidMount () {
    this.masterGain = this.props.audioCtx.createGain()
    this.masterGain.gain.setValueAtTime(this.state.value, this.props.audioCtx.currentTime)
    // setup guitaramp.js destination node.
  }

  componentDidUpdate () {
    console.log(this.state.value)
    // this.masterGain.gain.value = this.state.value
    // this.masterGain.gain.setTargetAtTime(this.state.value, this.props.audioCtx.currentTime, 0.5)
    // change gainvalue.
  }

  // Callback for wrapped event.
  handleInput (e) {
    this.setState({value: e.target.value})
  }

  render () {
    // Knob Props
    let id = 'masterGain'
    let src = ''
    let value = 1
    let defValue = 1
    let min = 1
    let max = 10
    let step = 0.01
    let width = 0
    let height = 0
    let sprites = 0
    let sensitivity = 1
    let valuetip = 1
    let tooltip = null
    let enable = 1
    let outline = 1
    let diameter = 64

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
        sprites={sprites}
        sensitivity={sensitivity}
        valuetip={valuetip}
        tooltip={tooltip}
        enable={enable}
        outline={outline}
        diameter={diameter} />
    )
  }
}

export default MasterGain
