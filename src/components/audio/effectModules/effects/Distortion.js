import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/guitarAmp/guitarEffects.scss'

class Distortion extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {distortionValue: 0}
    this.setupDistortion()
    this.handleGainChange = this.handleGainChange.bind(this)
  }

  setupDistortion () {
    this.distortion = this.audioCtx.createWaveShaper()
    this.distortion.oversample = '4x'
    this.distortion.curve = this.createCurve()
    this.effectModule = {
      id: this.props.id,
      input: this.distortion,
      internalChain: [],
      output: this.distortion
    }

    this.props.effectChain.push(this.effectModule)
  }
  createCurve () {
    // Curvecreation inspired by Kevin Ennis
    // @ http://stackoverflow.com/a/22313408/1090298
    let k = this.state.distortionValue * 10
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

  componentDidUpdate () {
    console.log(this.state.distortionValue)
    this.distortion.curve = this.createCurve()
    console.log(this.distortion.curve)
  }

  handleGainChange (e) {
    this.setState({distortionValue: e.target.value})
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
        <h3 className='moduleTitle'>Distortion</h3>
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

export default Distortion
