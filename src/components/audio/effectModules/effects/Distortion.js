import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/instrumentAmp/instrumentAmp.scss'
/**
 * * Represents a distortion effect module.
 *
 * @class Distortion
 * @extends {Component}
 */
class Distortion extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {
      distortion: 0,
      mix: 0
    }
    this.handleDistortionChange = this.handleDistortionChange.bind(this)
    this.handleMixChange = this.handleMixChange.bind(this)
  }
  /**
   * * Setup Audio Node
   * * Call curve generation method.
   * * Add to sound chain array
   */
  componentDidMount () {
    let overSamplingRate = '4x'
    this.waveShaper = this.audioCtx.createWaveShaper()
    this.waveShaper.oversample = overSamplingRate
    this.waveShaper.curve = this.generateCurve()

    this.inputGain = this.audioCtx.createGain()
    this.bypassGain = this.audioCtx.createGain()
    this.waveShaperGain = this.audioCtx.createGain()
    this.outputGain = this.audioCtx.createGain()

    this.inputGain.gain.setValueAtTime(1, this.audioCtx.currentTime) // ! Keep at 1 for 100% passthrough
    this.bypassGain.gain.setValueAtTime(1, this.audioCtx.currentTime)
    this.waveShaperGain.gain.setValueAtTime(0, this.audioCtx.currentTime)
    this.outputGain.gain.setValueAtTime(1, this.audioCtx.currentTime) // ! Keep at 1 for 100% passthrough

    this.inputGain.connect(this.waveShaper)
    this.inputGain.connect(this.bypassGain)
    this.waveShaper.connect(this.waveShaperGain)
    this.waveShaperGain.connect(this.outputGain)
    this.bypassGain.connect(this.outputGain)

    this.effectModule = {
      id: this.props.id,
      input: this.inputGain,
      output: this.outputGain
    }
    this.props.effectChain.push(this.effectModule)
  }
  componentWillUnmount () {
    this.inputGain.disconnect()
    this.inputGain.disconnect()
    this.waveShaper.disconnect()
    this.waveShaperGain.disconnect()
    this.bypassGain.disconnect()
  }
  /**
   * *A huge thanks to Kevin Ennis for providing the curve generation formula.
   * * Original can be found at http://stackoverflow.com/a/22313408/1090298
   * @memberof Distortion
   */
  generateCurve () {
    let distortionMultiplier = 50 // TODO: Try different multiplier values.
    let k = typeof this.state.distortion === 'number' ? this.state.distortion * distortionMultiplier : 0
    let sampleRate = typeof this.audioCtx.sampleRate === 'number' ? this.audioCtx.sampleRate : 44100
    let deg = Math.PI / 180
    let curve = new Float32Array(sampleRate)
    let x
    for (let i = 0; i < sampleRate; ++i) {
      x = i * 2 / sampleRate - 1
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x))
    }
    return curve
  }
  /**
   * *Generate new curve on state change
   * * Controlled input
   */
  componentDidUpdate () {
    let waveShaperGainValue = this.state.mix * 0.01
    let bypassGainValue = 1 - (this.state.mix * 0.01)
    this.waveShaperGain.gain.setValueAtTime(waveShaperGainValue, this.audioCtx.currentTime)
    this.bypassGain.gain.setValueAtTime(bypassGainValue, this.audioCtx.currentTime)
    this.waveShaper.curve = this.generateCurve()
  }
  /**
   * * Callback for Distortion value parameter knob
   * @param {*} e event
   * @memberof Distortion
   */
  handleDistortionChange (e) {
    this.setState({distortion: e.target.value})
  }
  handleMixChange (e) {
    this.setState({mix: e.target.value})
  }

  render () {
     //* Distortion parameter Knob Props
    let id = ''
    let src = ''
    let defValue = 0
    let min = 0
    let max = 100
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
        <h3 className='moduleTitle'>Distortion</h3>
        <span>Dist</span>
        <Knob onInput={this.handleDistortionChange}
          id={id}
          src={src}
          value={this.state.distortion}
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
        <span>Mix</span>
        <Knob onInput={this.handleMixChange}
          id={id}
          src={src}
          value={this.state.mix}
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

export default Distortion
