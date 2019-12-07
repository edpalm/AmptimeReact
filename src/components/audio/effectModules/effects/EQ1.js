import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import Slider from '../../../gui/Slider'
import '../../../../styles/instrumentAmp/instrumentAmp.scss'
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
      hz: 250,
      filterGain: 0,
      Q: 1
    }
    this.handleHzChange = this.handleHzChange.bind(this)
    this.handleFilterGainChange = this.handleFilterGainChange.bind(this)
    this.handleQChange = this.handleQChange.bind(this)
  }
  /**
   * * Create audio nodes and set initial values
   * * Connect internal chain
   * * Add to effect chain array
   */
  componentDidMount () {
    this.inputGain = this.audioCtx.createGain()
    this.outputGain = this.audioCtx.createGain()
    this.filter = this.audioCtx.createBiquadFilter()

    this.inputGain.gain.setValueAtTime(1, this.audioCtx.currentTime)
    this.outputGain.gain.setValueAtTime(1, this.audioCtx.currentTime)
    this.filter.type = 'peaking'
    this.filter.frequency.setValueAtTime(this.state.hz, this.audioCtx.currentTime)
    this.filter.gain.setValueAtTime(this.state.filterGain, this.audioCtx.currentTime)
    this.filter.Q.setValueAtTime(this.state.Q, this.audioCtx.currentTime)

    this.inputGain.connect(this.filter)
    this.filter.connect(this.outputGain)

    this.effectModule = {
      id: this.props.id,
      input: this.inputGain,
      output: this.outputGain
    }
    this.props.effectChain.push(this.effectModule)
  }

  componentDidUpdate () {
    this.filter.frequency.setValueAtTime(this.state.hz, this.audioCtx.currentTime)
    this.filter.gain.setValueAtTime(this.state.filterGain, this.audioCtx.currentTime)
    this.filter.Q.setValueAtTime(this.state.Q, this.audioCtx.currentTime)
    console.log(this.filter.frequency.value)
  }

  componentWillUnmount () {
    this.inputGain.disconnect()
    this.outputGain.disconnect()
    this.filter.disconnect()
  }

  handleHzChange (e) {
    this.setState({hz: e.target.value})
  }

  handleQChange (e) {
    this.setState({Q: e.target.value})
  }

  handleFilterGainChange (e) {
    this.setState({filterGain: e.target.value})
  }

  render () {
    //* Eq 1 filter-slider functional properties.
    let filterDefvalue = 0
    let filterMin = -24
    let filterMax = 24
    let filterStep = 0.1 // TODO: Try different steps
    //* Eq 1 filter-slider inlinestyles. Default values selected.
    // TODO: Check availability to control with css.
    let filterSrc = ''
    let filterKnobSrc = ''
    let filterWidth = ''
    let filterHeight = ''
    let filterKnobwidth = ''
    let filterKnobheight = ''
    let filterDitchlength = ''
    let filterDirection = ''
    let filterTracking = ''
    let filterSensitivity = ''
    let filterValuetip = 1
    let filterTooltip = null
    let filterConv = null
    let filterEnable = 1
    let filterOutline = 1
    let filterMidilearn = 0
    let filterMidicc = null

    // * Q-Knob Props
    let qKnobTitle = 'Q'
    let qDefValue = 1
    let qMin = 1
    let qMax = 10
    let qStep = 0.01

    // * Hz-Knob Props
    let hzKnobTitle = 'Hz'
    let hzDefValue = 250
    let hzMin = 250
    let hzMax = 20000
    let hzStep = 250

    // * General knob style props
    let src = '../img/sonatom.png'
    let width = 0
    let height = 0
    let diameter = 64
    let sprites = 100
    let sensitivity = 0.5
    let valuetip = 1
    let tooltip = null
    let conv = null
    let enable = 1
    let outline = 1
    let midilearn = 0
    let midicc = null
    // TODO: Add class to div for controlgroup styles. * Move h3 outside div(?)
    return (
      <div>
        <h3>Eq-1</h3>
        <Slider
          onInput={this.handleFilterGainChange}
          src={filterSrc}
          knobsrc={filterKnobSrc}
          value={this.state.filterGain}
          defvalue={filterDefvalue}
          min={filterMin}
          max={filterMax}
          step={filterStep}
          width={filterWidth}
          height={filterHeight}
          knobwidth={filterKnobwidth}
          knobheight={filterKnobheight}
          ditchlength={filterDitchlength}
          direction={filterDirection}
          tracking={filterTracking}
          sensitivity={filterSensitivity}
          valuetip={filterValuetip}
          tooltip={filterTooltip}
          conv={filterConv}
          enable={filterEnable}
          outline={filterOutline}
          midilearn={filterMidilearn}
          midicc={filterMidicc}
          />
        <span>{hzKnobTitle}</span>
        <Knob onInput={this.handleHzChange}
          src={src}
          value={this.state.hz}
          defvalue={hzDefValue}
          min={hzMin}
          max={hzMax}
          step={hzStep}
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
        <span>{qKnobTitle}</span>
        <Knob onInput={this.handleQChange}
          src={src}
          value={this.state.Q}
          defvalue={qDefValue}
          min={qMin}
          max={qMax}
          step={qStep}
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
