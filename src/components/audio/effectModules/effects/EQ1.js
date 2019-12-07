import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import Slider from '../../../gui/Slider'
import '../../../../styles/guitarAmp/guitarEffects.scss'
/**
 * * Represents a 1-Filter Equalizer.
 *
 * @class EQ1
 * @extends {Component}
 */
class EQ1 extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {
      filterType: '', // TODO: Add filter selection(notch/peak).
      frequency: 0, // TODO: Add frequency selection.
      gain: 0, // TODO: Add gain parameter.
      Q: 0 // TODO: Add Q-value parameter.
    }
    this.handleGainChange = this.handleGainChange.bind(this)
  }
  /**
   * * Create audio nodes and set initial values
   * * Connect internal chain
   * * Add to effect chain array
   */
  componentDidMount () {
    // create and connect all nodes.
    /* this.effectModule = {
      id: this.props.id,
      input: this.gain,
      output: this.gain
    } */
    // this.props.effectChain.push(this.effectModule)
  }

  /* componentDidUpdate () {
    this.gain.gain.setValueAtTime(this.state.gain, this.audioCtx.currentTime)
  } */

  componentWillUnmount () {
    // Disconnect all nodes.
  }

  handleGainChange (e) {
    console.log(e.target.value)
  }

  render () {
    // * Q-Knob Props
    let qKnobTitle = 'Q'
    let src = '../img/sonatom.png'
    let value = 1 //! Has to be 1
    let defValue = 1 //! Has to be 1
    let min = 1 //! Has to be 1
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
    // TODO: Dropdown for filter selection | Create Gui-component.
    // TODO: Textinput showing current chosen frequency and allows for typing a frequency 0-20000 | Create Gui-component
    // TODO: Knob for Qvalue
    return (
      <div>
        <Slider onInput={this.handleEqhange} />
        <span>{qKnobTitle}</span>
        <Knob onInput={this.handleQChange}
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
        <Switch />
      </div>
    )
  }
}

export default EQ1
