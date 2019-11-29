import React, { Component } from 'react'
// import Knob from '../../../gui/Knob'
// import Switch from '../../../gui/Switch'
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
    // TODO: Dropdown for filter selection | Create Gui-component.
    // TODO: Textinput showing current chosen frequency and allows for typing a frequency 0-20000 | Create Gui-component
    // TODO: Knob for Qvalue
    return (
      <div>
        <Slider onInput={this.handleGainChange} />
      </div>
    )
  }
}

export default EQ1
