import React, { Component } from 'react'
import Gain from './effects/Gain'

class BaseModule extends Component {
  render () {
    console.log(this.props.effectType)
    if (this.props.effectType === 'gain') {
      return (
        <Gain key={this.props.effectType + this.props.id} audioCtx={this.props.audioCtx} />
      )
    } else {
      return (
        <p>l</p>
      )
    }
  }
}

export default BaseModule
