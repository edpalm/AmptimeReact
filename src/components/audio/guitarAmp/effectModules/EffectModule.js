import React, { Component } from 'react'
import Gain from './effects/Gain'

// Controller & Facade for effect modules.
class BaseModule extends Component {
  render () {
    if (this.props.effectType === 'gain') {
      return (
        <Gain key={this.props.effectType + this.props.id} effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
      )
    } else {
      return (
        <p>l</p>
      )
    }
  }
}

export default BaseModule
