
import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import '../../../../styles/guitarAmp/guitarAmp.scss'
/*
 * TODO: change value of guitaramp.js mastergainnode on change
*/
class MasterGain extends Component {
  constructor () {
    super()
    this.state = {value: 0}
    // Knob Props
    this.diameter = 64
    this.minValue = 0
    this.maxValue = 100
    // Bind callback
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount () {
    // setup end destination gain node. Set as Guitaramp.js endDestination variable.
  }

  componentDidUpdate () {
    // set gain value of this.masterGainNode
    console.log(this.state.value)
  }

  // Callback for wrapped event.
  handleInput (e) {
    this.setState({value: e.target.value})
    // change gainvalue.
  }

  render () {
    return (
      <Knob onInput={this.handleInput} id='masterGain' min={this.minValue} max={this.maxValue} diameter={this.diameter} />
    )
  }
}

export default MasterGain
