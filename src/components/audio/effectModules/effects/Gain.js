import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/guitarAmp/guitarEffects.scss'
/**
 * * Represents a Gain effect module.
 *
 * @class Gain
 * @extends {Component}
 */
class Gain extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {
      gain: 1 // ! Default value. Has to be >= 1 since less means gain reduction.
    }
    //* Bind callbacks
    this.handleGainChange = this.handleGainChange.bind(this)
  }

  componentDidMount () {
    this.gain = this.audioCtx.createGain()
    this.gain.gain.setValueAtTime(this.state.gain, this.audioCtx.currentTime)
    this.effectModule = {
      id: this.props.id,
      input: this.gain,
      output: this.gain
    }
    this.props.effectChain.push(this.effectModule)
  }
  /**
   * * Set gain value based on state.
   * * Controlled input.
   */
  componentDidUpdate () {
    this.gain.gain.setValueAtTime(this.state.gain, this.audioCtx.currentTime)
  }
  /**
   * * Callback for Gain parameter knob.
   * * Set gain value state
   * @param {*} e event
   * @memberof Gain
   */
  handleGainChange (e) {
    this.setState({gain: e.target.value})
  }
  render () {
     // * Gain Knob Props
    let gainKnobTitle = 'Gain'
    let src = '../img/sonatom.png'
    let defValue = 1 //! Has to be > 0
    let min = 1 //! Has to be > 0
    let max = 10
    let step = 0.01
    let width = 0
    let height = 0
    let diameter = 64
    let sprites = 100
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
          value={this.state.gain}
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
