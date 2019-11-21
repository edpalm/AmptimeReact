import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/guitarAmp/guitarEffects.scss'

class Gain extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.setupGainEffect()
    this.minValue = 0
    this.maxValue = 10
    this.diameter = 40
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

  handleGainChange () {
    console.log('changing gain')
  }
  render () {
    // Move switch to EffectModule.js
    return (
      <div className='gain'>
        <h3 className='moduleTitle'>Gain</h3>
        <Knob onInput={this.handleGainChange} id='masterGain' min={this.minValue} max={this.maxValue} diameter={this.diameter} />
        <Switch onClick={this.handleClick} height={this.height} width={this.width} />
      </div>
    )
  }
}

export default Gain
