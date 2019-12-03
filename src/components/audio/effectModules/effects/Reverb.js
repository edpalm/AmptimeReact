import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/guitarAmp/guitarEffects.scss'
const Freeverb = require('soundbank-reverb')

/**
 * * Represents a Schroeder Reverberator.
 *
 * @class Reverb
 * @extends {Component}
 */
class Reverb extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {
      mix: 0, //* 0-1
      time: 0.1, //* Duration of reverberation
      decay: 0, //* 0-1
      cutoff: 20000, //* 250-20000. Hz Cutoff Point
      reverse: false
    }
    //* Bind Knobs And Switch Callbacks
    this.handleMixChange = this.handleMixChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleDecayChange = this.handleDecayChange.bind(this)
    this.handleCutoffChange = this.handleCutoffChange.bind(this)
    this.handleReverse = this.handleReverse.bind(this)
  }
  /**
   * * Create audio nodes and set initial values
   * * Connect internal chain
   * * Add to effect chain array
   */
  componentDidMount () {
    this.inputGain = this.audioCtx.createGain()
    this.reverbGain = this.audioCtx.createGain()
    this.bypassGain = this.audioCtx.createGain()
    this.outputGain = this.audioCtx.createGain()

    //! Default Values for a newly added Reverb.Do not change.
    this.inputGain.gain.setValueAtTime(1, this.audioCtx.currentTime)
    this.bypassGain.gain.setValueAtTime(1, this.audioCtx.currentTime)
    this.outputGain.gain.setValueAtTime(1, this.audioCtx.currentTime)
    this.reverbGain.gain.setValueAtTime(0, this.audioCtx.currentTime)

    this.reverb = Freeverb(this.audioCtx)
    this.reverb.time = this.state.time
    this.reverb.decay = this.state.decay
    this.reverb.wet.value = 1
    this.reverb.dry.value = 0
    this.reverb.cutoff.value = this.state.cutoff
    this.reverb.filterType = 'lowpass'

    //* Connect Internal Chain
    this.inputGain.connect(this.reverb)
    this.reverb.connect(this.reverbGain)
    this.reverbGain.connect(this.outputGain)
    this.inputGain.connect(this.bypassGain)
    this.bypassGain.connect(this.outputGain)

    this.effectModule = {
      id: this.props.id,
      input: this.inputGain,
      output: this.outputGain
    }
    this.props.effectChain.push(this.effectModule)
  }

  componentDidUpdate () {
    //* Mirrored inverse values to control mix.
    let bypassGainValue = 1 - (this.state.mix * 0.1)
    let reverbGainValue = this.state.mix * 0.1
    //* Set new values.
    this.bypassGain.gain.setValueAtTime(bypassGainValue, this.audioCtx.currentTime)
    this.reverbGain.gain.setValueAtTime(reverbGainValue, this.audioCtx.currentTime)
    this.reverb.time = this.state.time
    this.reverb.decay = this.state.decay
    this.reverb.cutoff.value = this.state.cutoff
  }

  componentWillUnmount () {
    this.inputGain.disconnect()
    this.bypassGain.disconnect()
    this.reverbGain.disconnect()
    this.outputGain.disconnect()
    this.reverb.disconnect()
  }

  handleMixChange (e) {
    this.setState({mix: e.target.value})
  }

  handleTimeChange (e) {
    this.setState({time: e.target.value})
  }

  handleDecayChange (e) {
    this.setState({decay: e.target.value})
  }

  handleCutoffChange (e) {
    this.setState({cutoff: e.target.value})
  }

  handleReverse (e) {
    this.setState({reverse: !this.state.reverse})
  }

  render () {
    //* General knob props
    let src = '../img/sonatom.png'
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

    //* Mix Knob Props
    let mixKnobTitle = 'Mix'
    let mixValue = 0
    let mixDefValue = 0
    let mixMin = 0
    let mixMax = 10
    let mixStep = 1 // TODO: Try different steps.

    //* Time Knob Props
    let timeKnobTitle = 'Time'
    let timeValue = 0
    let timeDefValue = 0
    let timeMin = 0
    let timeMax = 10
    let timeStep = 0.1

    //* Decay Knob Props
    let decayKnobTitle = 'Decay'
    let decayValue = 0
    let decayDefValue = 0
    let decayMin = 0
    let decayMax = 10
    let decayStep = 1

    //* Cutoff Knob Props
    let cutoffKnobTitle = 'cutoff'
    let cutoffValue = 0
    let cutoffDefValue = 0
    let cutoffMin = 250
    let cutoffMax = 20000
    let cutoffStep = 1 // TODO: Try different steps.

    return (
      <div>
        <span>Reverse</span>
        <Switch onClick={this.handleReverse} height={this.height} width={this.width} />
        <span>{mixKnobTitle}</span>
        <Knob onInput={this.handleMixChange}
          src={src}
          value={mixValue}
          defvalue={mixDefValue}
          min={mixMin}
          max={mixMax}
          step={mixStep}
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
        <span>{timeKnobTitle}</span>
        <Knob onInput={this.handleTimeChange}
          src={src}
          value={timeValue}
          defvalue={timeDefValue}
          min={timeMin}
          max={timeMax}
          step={timeStep}
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
        <span>{decayKnobTitle}</span>
        <Knob onInput={this.handleDecayChange}
          src={src}
          value={decayValue}
          defvalue={decayDefValue}
          min={decayMin}
          max={decayMax}
          step={decayStep}
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
        <span>{cutoffKnobTitle}</span>
        <Knob onInput={this.handleCutoffChange}
          src={src}
          value={cutoffValue}
          defvalue={cutoffDefValue}
          min={cutoffMin}
          max={cutoffMax}
          step={cutoffStep}
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

export default Reverb
