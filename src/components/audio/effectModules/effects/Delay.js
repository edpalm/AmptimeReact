import React, { Component } from 'react'
import Knob from '../../../gui/Knob'
import Switch from '../../../gui/Switch'
import '../../../../styles/instrumentAmp/instrumentAmp.scss'
/**
 ** Represents a delay effect module.
 */
class Delay extends Component {
  constructor (props) {
    super(props)
    this.audioCtx = this.props.audioCtx
    this.state = {
      time: 0,
      feedback: 1
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleFeedbackChange = this.handleFeedbackChange.bind(this)
  }
  /**
  * * Setup Nodes and connect internal chain
  * * Add to sound chain array
  */
  componentDidMount () {
    this.inputGain = this.audioCtx.createGain()
    this.delay = this.audioCtx.createDelay(100)
    this.feedbackGain = this.audioCtx.createGain()
    this.bypassGain = this.audioCtx.createGain()

    this.delay.delayTime.value = 0
    this.feedbackGain.gain.value = 0
    this.bypassGain.gain.value = 1 //* Do not change. Has to be at 1 for complete bypassGain.
    this.inputGain.gain.value = 1 //* Do not change. Has to be at 1 for complete bypassGain.

    this.inputGain.connect(this.delay)
    this.inputGain.connect(this.bypassGain)
    this.delay.connect(this.feedbackGain)
    this.feedbackGain.connect(this.delay)
    this.delay.connect(this.bypassGain)

    this.effectModule = {
      id: this.props.id,
      input: this.inputGain,
      output: this.bypassGain
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
    this.feedbackGain.disconnect()
    this.bypassGain.disconnect()
  }

  componentDidUpdate () {
    this.delay.delayTime.setValueAtTime(this.state.time, this.audioCtx.currentTime)
    let feedbackGainReduction = 1 - (1 / this.state.feedback) // TODO: Rethink parameter functinality. Translate X repetitions to percentage
    this.feedbackGain.gain.setValueAtTime(feedbackGainReduction, this.audioCtx.currentTime)
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
    let timeDefValue = 0
    let timeMin = 0
    let timeMax = 10
    let timeStep = 0.1

    // Feedback Knob Props
    let feedbackKnobTitle = 'Feedback'
    let feedbackDefValue = 1
    let feedbackMin = 1
    let feedbackMax = 10
    let feedbackStep = 1

    return (
      <div>
        <h3 className='moduleTitle'>Delay</h3>
        <span>{timeKnobTitle}</span>
        <Knob onInput={this.handleTimeChange}
          id=''
          src={src}
          value={this.state.time}
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
          value={this.state.feedback}
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
