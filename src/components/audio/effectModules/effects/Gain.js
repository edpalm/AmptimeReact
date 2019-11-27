import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/guitarAmp/guitarEffects.scss'

class Gain extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {
      gainValue: 1
    }
    this.setupGain()

    this.handleGainChange = this.handleGainChange.bind(this)
  }

  setupGain () {
    this.gain = this.audioCtx.createGain()
    this.gain.gain.setValueAtTime(this.state.gainValue, this.audioCtx.currentTime)

    this.effectModule = {
      id: this.props.id,
      input: this.gain,
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
     // Gain Knob Props
    let gainKnobTitle = 'Gain'
    let src = ''
    let value = 1
    let defValue = 1
    let min = 1
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
        <span>{gainKnobTitle}</span>
        <Knob onInput={this.handleGainChange}
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
