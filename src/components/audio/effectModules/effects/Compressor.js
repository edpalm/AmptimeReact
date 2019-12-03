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
class Compressor extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {
      threshold: 0,
      knee: 0,
      ratio: 1,
      attack: 0,
      release: 0
    }
    //* Bind callbacks
    this.handleThresholdChange = this.handleThresholdChange.bind(this)
    this.handleKneeChange = this.handleKneeChange.bind(this)
    this.handleRatioChange = this.handleRatioChange.bind(this)
    this.handleAttackChange = this.handleAttackChange.bind(this)
    this.handleReleaseChange = this.handleReleaseChange.bind(this)
  }

  componentDidMount () {
    this.compressor = this.audioCtx.createDynamicsCompressor()
    this.compressor.threshold.setValueAtTime(this.state.threshold, this.audioCtx.currentTime)
    this.compressor.knee.setValueAtTime(this.state.knee, this.audioCtx.currentTime)
    this.compressor.ratio.setValueAtTime(this.state.ratio, this.audioCtx.currentTime)
    this.compressor.attack.setValueAtTime(this.state.attack, this.audioCtx.currentTime)
    this.compressor.release.setValueAtTime(this.state.release, this.audioCtx.currentTime)

    this.effectModule = {
      id: this.props.id,
      input: this.compressor,
      output: this.compressor
    }
    this.props.effectChain.push(this.effectModule)
  }
  componentDidUpdate () {
    this.compressor.threshold.setValueAtTime(this.state.threshold, this.audioCtx.currentTime)
    this.compressor.knee.setValueAtTime(this.state.knee, this.audioCtx.currentTime)
    this.compressor.ratio.setValueAtTime(this.state.ratio, this.audioCtx.currentTime)
    this.compressor.attack.setValueAtTime(this.state.attack, this.audioCtx.currentTime)
    this.compressor.release.setValueAtTime(this.state.release, this.audioCtx.currentTime)
  }
  handleThresholdChange (e) {
    this.setState({threshold: e.target.value})
  }
  handleKneeChange (e) {
    this.setState({knee: e.target.value})
  }
  handleRatioChange (e) {
    this.setState({ratio: e.target.value})
  }
  handleAttackChange (e) {
    this.setState({attack: e.target.value})
  }
  handleReleaseChange (e) {
    this.setState({release: e.target.value})
  }
  render () {
    //* General Knob Props
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

    // * Threshold Knob Props
    let thresholdKnobTitle = 'Threshold'
    let thresholdValue = 0
    let thresholdDefValue = 0
    let thresholdMin = -100
    let thresholdMax = 0
    let thresholdStep = 1

    // * Knee Knob Props
    let kneeKnobTitle = 'Knee'
    let kneeValue = 1
    let kneeDefValue = 1
    let kneeMin = 0
    let kneeMax = 40
    let kneeStep = 1

    // * Ratio Knob Props
    let ratioKnobTitle = 'Ratio'
    let ratioValue = 1
    let ratioDefValue = 1
    let ratioMin = 1
    let ratioMax = 20
    let ratioStep = 1

    // * Attack Knob Props
    let attackKnobTitle = 'Attack'
    let attackValue = 0
    let attackDefValue = 0
    let attackMin = 0
    let attackMax = 1
    let attackStep = 0.001 // TODO: Try different steps.

    // * Release Knob Props
    let releaseKnobTitle = 'Release'
    let releaseValue = 0
    let releaseDefValue = 0
    let releaseMin = 0
    let releaseMax = 1
    let releaseStep = 0.001 // TODO: Try different steps.

    return (
      <div>
        <h3 className='moduleTitle'>Compressor</h3>
        <span>{thresholdKnobTitle}</span>
        <Knob onInput={this.handleThresholdChange}
          src={src}
          value={thresholdValue}
          defvalue={thresholdDefValue}
          min={thresholdMin}
          max={thresholdMax}
          step={thresholdStep}
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
        <span>{kneeKnobTitle}</span>
        <Knob onInput={this.handleKneeChange}
          src={src}
          value={kneeValue}
          defvalue={kneeDefValue}
          min={kneeMin}
          max={kneeMax}
          step={kneeStep}
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
        <span>{ratioKnobTitle}</span>
        <Knob onInput={this.handleRatioChange}
          src={src}
          value={ratioValue}
          defvalue={ratioDefValue}
          min={ratioMin}
          max={ratioMax}
          step={ratioStep}
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
        <span>{attackKnobTitle}</span>
        <Knob onInput={this.handleAttackChange}
          src={src}
          value={attackValue}
          defvalue={attackDefValue}
          min={attackMin}
          max={attackMax}
          step={attackStep}
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
        <span>{releaseKnobTitle}</span>
        <Knob onInput={this.handleReleaseChange}
          src={src}
          value={releaseValue}
          defvalue={releaseDefValue}
          min={releaseMin}
          max={releaseMax}
          step={releaseStep}
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

export default Compressor
