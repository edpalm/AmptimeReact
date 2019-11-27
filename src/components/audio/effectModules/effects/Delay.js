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
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this)
    this.setupDelay()
  }

  setupDelay () {
    console.log('setting up delay')
    this.inputGain = this.audioCtx.createGain()
    this.delay = this.audioCtx.createDelay(100)
    this.feedback = this.audioCtx.createGain()
    this.bypass = this.audioCtx.createGain()

    this.delay.delayTime.value = this.state.timeValue
    this.feedback.gain.value = this.state.feedbackValue
    this.bypass.gain.value = 1 // always at 1 for complete bypass.
    this.inputGain.gain.value = 1 // always at 1 for complete input bypass.

    this.inputGain.connect(this.delay)
    this.inputGain.connect(this.bypass)
    this.delay.connect(this.feedback)
    this.feedback.connect(this.delay)
    this.delay.connect(this.bypass)

    this.effectModule = {
      id: this.props.id,
      input: this.inputGain,
      output: this.bypass
    }

    this.props.effectChain.push(this.effectModule)
  }

  /* componentWillUnmount () {
    disconnect all internal node connections
  } */

  componentDidUpdate () {
    let feedbackLoops = 1 / this.state.feedbackValue // gain 0 - 1.
    this.delay.delayTime.setValueAtTime(this.state.timeValue, this.audioCtx.currentTime)
    this.feedback.gain.setValueAtTime(feedbackLoops, this.audioCtx.currentTime)
  }

  handleTimeChange (e) {
    this.setState({timeValue: e.target.value})
  }

  handleFeedbackChange (e) {
    // Adjust value to represent actual amount of repetitions.
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
    let timeValue = 0
    let timeDefValue = 0
    let timeMin = 0
    let timeMax = 10
    let timeStep = 0.1

    // Feedback Knob Props
    let feedbackKnobTitle = 'Feedback'
    let feedbackValue = 0
    let feedbackDefValue = 0
    let feedbackMin = 0
    let feedbackMax = 100
    let feedbackStep = 0.1

    return (
      <div>
        <h3 className='moduleTitle'>Delay</h3>
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
