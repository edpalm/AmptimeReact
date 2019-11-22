import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/guitarAmp/guitarEffects.scss'

class Gain extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {gainValue: 0} // setup proper states for gain.
    this.setupGainEffect()

    this.handleGainChange = this.handleGainChange.bind(this)
  }

  setupGainEffect () {
    this.gain = this.audioCtx.createGain()
    this.gain.gain.setValueAtTime(this.state.gainValue, this.audioCtx.currentTime)

    this.delay = this.audioCtx.createDelay()
    this.compressor = this.audioCtx.createDynamicsCompressor()

    this.effectModule = {
      id: this.props.id,
      input: this.gain,
      internalChain: [],
      output: this.gain
    }

    this.props.effectChain.push(this.effectModule)
  }

  componentDidUpdate () {
    console.log(this.state.gainValue)
    this.gain.gain.setValueAtTime(this.state.gainValue, this.audioCtx.currentTime)
  }

  handleGainChange (e) {
    this.setState({gainValue: e.target.value})
    console.log('changing gain')
  }
  render () {
     // Knob Props
    let id = ''
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
      <div>
        <h3 className='moduleTitle'>Gain</h3>
        <Knob onInput={this.handleGainChange}
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
        <Switch onClick={this.handleClick} height={this.height} width={this.width} />
      </div>
    )
  }
}

export default Gain
