import React, { Component } from 'react'

class Gain extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.setupGainEffect()
    this.state = {} // setup proper states for gain.
    /*
      Setup signal chain of audioCtx nodes for the gain effect module. this.props.audioCtx
      Set initial state values
    */
  }

  setupGainEffect () {
    this.gain = this.audioCtx.createGain()
    this.gain.gain.setValueAtTime(0, this.audioCtx.currentTime)

    this.chainGain1 = this.audioCtx.createGain()
    this.chainGain1.gain.setValueAtTime(0, this.audioCtx.currentTime)

    this.chainGain2 = this.audioCtx.createGain()
    this.chainGain1.gain.setValueAtTime(0, this.audioCtx.currentTime)

    this.testGain = this.audioCtx.createGain()
    this.testGain.gain.setValueAtTime(0, this.audioCtx.currentTime)

    this.effectModule = {
      input: this.gain,
      internalChain: [this.chainGain1, this.chainGain1],
      output: this.testGain
    }

    this.props.effectChain.push(this.effectModule)
  }

  render () {
    // html switch for on/off.
    // html knob elements.
    // Tie knob changes to state props.
    // display showing state props?
    return (
      <div>
        <input type='range' min='0' max='10' defaultValue='0' />
        <button type='button'>Switcha</button>
      </div>
    )
  }
}

export default Gain
