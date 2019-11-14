import React, { Component } from 'react'
import Gain from './effects/Gain'

// Controller & Facade for effect modules.
class EffectModule extends Component {
  render () {
    if (this.props.effectType === 'gain') {
      return (
        <Gain effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
      )
    } else {
      return (
        <p>l</p>
      )
    }
  }
}

export default EffectModule
