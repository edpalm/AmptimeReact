import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/guitarAmp/guitarEffects.scss'
/**
 * Represents a delay effect module.
 * @class Delay
 * @extends {Component}
 */
class Delay extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {
      time: 0,
      feedback: 0
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this)
    this.setupDelay()
  }
  /**
   * * Setup Nodes and connect internal chain
   * * Add to sound chain array
   */
  setupDelay () {
    this.inputGain = this.audioCtx.createGain()
    this.delay = this.audioCtx.createDelay(100)
    this.feedback = this.audioCtx.createGain()
    this.bypass = this.audioCtx.createGain()

    this.delay.delayTime.value = this.state.time
    this.feedback.gain.value = this.state.feedback
    this.bypass.gain.value = 1 //* Do not change. Has to be at 1 for complete bypass.
    this.inputGain.gain.value = 1 //* Do not change. Has to be at 1 for complete bypass.

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
  /**
   * *Web Audio Nodes are garbagecollocted when they're not connected
   * *Disconnect all nodes when before component is unmounted when removed from chain.
   */
  componentWillUnmount () {
    this.inputGain.disconnect()
    this.delay.disconnect()
    this.feedback.disconnect()
  }

  componentDidUpdate () {
    let feedbackMultiplier = 0.01 // TODO: Compare with other multipliers.
    this.delay.delayTime.setValueAtTime(this.state.time, this.audioCtx.currentTime)
    this.feedback.gain.setValueAtTime(this.state.feedback * feedbackMultiplier, this.audioCtx.currentTime)
  }
  /**
   * * Callback for time parameter knob
   * * Set-timestate
   * * Controlled input
   * @param e event
   */
  handleTimeChange (e) {
    this.setState({time: e.target.value})
  }
  /**
   * * Callback for feedback parameter knob
   * * Set-timestate
   * * Controlled input
   * @param e event
   */
  handleFeedbackChange (e) {
    this.setState({feedback: e.target.value})
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
    let time = 0
    let timeDefValue = 0
    let timeMin = 0
    let timeMax = 10
    let timeStep = 0.1

    // Feedback Knob Props
    let feedbackKnobTitle = 'Feedback'
    let feedback = 0
    let feedbackDefValue = 0
    let feedbackMin = 0
    let feedbackMax = 100
    let feedbackStep = 1

    return (
      <div>
        <h3 className='moduleTitle'>Delay</h3>
        <span>{timeKnobTitle}</span>
        <Knob onInput={this.handleTimeChange}
          id=''
          src={src}
          value={time}
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
          value={feedback}
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
