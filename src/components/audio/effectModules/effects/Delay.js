import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/guitarAmp/guitarEffects.scss'

class Delay extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {
      timeValue: 0,
      feedbackValue: 0
    } // setup proper states for gain.
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this)
    this.setupDelay()
  }

  setupDelay () {
    console.log('setting up delay')
    this.gain = this.audioCtx.createGain()
    this.gain.gain.setValueAtTime(this.state.gainValue, this.audioCtx.currentTime)

    this.effectModule = {
      id: this.props.id,
      input: this.gain,
      internalChain: [],
      output: this.gain
    }

    this.props.effectChain.push(this.effectModule)
  }

  componentDidUpdate () {
    console.log(this.state.timeValue)
    console.log(this.state.feedbackValue)
  }

  handleTimeChange (e) {
    this.setState({timeValue: e.target.value}) 
  }
  handleFeedbackChange (e) {
    this.setState({feedbackValue: e.target.value})
  }

  render () {
    // General Knob Props
    let src = ''
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

    // Time Knob Props
    let timeKnobTitle = 'Time'
    let timeValue = 1
    let timeDefValue = 1
    let timeMin = 1
    let timeMax = 10
    let timeStep = 0.01

    // Feedback Knob Props
    let feedbackKnobTitle = 'Feedback'
    let feedbackValue = 1
    let feedbackDefValue = 1
    let feedbackMin = 1
    let feedbackMax = 10
    let feedbackStep = 0.01

    return (
      <div>
        <h3 className='moduleTitle'>Gain</h3>
        <span>{timeKnobTitle}</span>
        <Knob onInput={this.handleTimeChange}
          id=''
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
        <span>{feedbackKnobTitle}</span>
        <Knob onInput={this.handleFeedbackChange}
          id=''
          src={src}
          value={feedbackValue}
          defvalue={feedbackDefValue}
          min={feedbackMin}
          max={feedbackMax}
          step={feedbackStep}
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

export default Delay
