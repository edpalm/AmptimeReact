import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/instrumentAmp/instrumentAmp.scss'
const axios = require('axios')
/**
 * * Represents an amp-simulation Cabinet effect module.
 */
class Cabinet extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {
      mix: 0
    }
    this.handleMixChange = this.handleMixChange.bind(this)
  }
  /**
   * * Setup Audio Nodes
   * * Get impulseresponse
   * * Add to sound chain array
   */
  componentDidMount () {
    this.inputGain = this.audioCtx.createGain()
    this.convolver = this.audioCtx.createConvolver()
    this.bypassGain = this.audioCtx.createGain()
    this.convolverGain = this.audioCtx.createGain()
    this.outputGain = this.audioCtx.createGain()

    this.inputGain.gain.setValueAtTime(1, this.audioCtx.currentTime) // ! Keep at 1 for 100% passthrough
    this.bypassGain.gain.setValueAtTime(1, this.audioCtx.currentTime)
    this.convolverGain.gain.setValueAtTime(0, this.audioCtx.currentTime)
    this.outputGain.gain.setValueAtTime(1, this.audioCtx.currentTime) // ! Keep at 1 for 100% passthrough
    this.setImpulseResponseBuffer()
    this.inputGain.connect(this.convolver)
    this.inputGain.connect(this.bypassGain)
    this.convolver.connect(this.convolverGain)
    this.convolverGain.connect(this.outputGain)
    this.bypassGain.connect(this.outputGain)
    this.effectModule = {
      id: this.props.id,
      input: this.inputGain,
      output: this.outputGain
    }
    this.props.effectChain.push(this.effectModule)
  }

  async setImpulseResponseBuffer () {
    let response = await axios(
      {
        method: 'get',
        url: '../audio/ampsim.wav', // TODO: Change to mp3
        responseType: 'arraybuffer'
      })
    let requestedBuffer = response.data
    await this.audioCtx.decodeAudioData(requestedBuffer, (buffer) => {
      console.log(buffer)
      this.convolver.buffer = buffer
    }, (error) => {
      console.log(`Decoding failed :${error.err}`)
    })
  }
  componentWillUnmount () {
    this.inputGain.disconnect()
    this.convolver.disconnect()
    this.bypassGain.disconnect()
    this.convolverGain.disconnect()
    this.outputGain.disconnect()
  }
  componentDidUpdate () {
    console.log(this.convolver.buffer)
    let convolverGainValue = this.state.mix * 0.01
    let bypassGainValue = 1 - (this.state.mix * 0.01)
    this.convolverGain.gain.setValueAtTime(convolverGainValue, this.audioCtx.currentTime)
    this.bypassGain.gain.setValueAtTime(bypassGainValue, this.audioCtx.currentTime)
  }
  /**
   * * Callback for Cabinet value parameter knob
   * @param {*} e event
   * @memberof Cabinet
   */
  handleMixChange (e) {
    this.setState({mix: e.target.value})
  }

  render () {
     //* Cabinet parameter Knob Props
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
        <h3 className='moduleTitle'>Cabinet</h3>
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

export default Cabinet
