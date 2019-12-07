import React, { Component } from 'react'
import '../../../styles/instrumentAmp/instrumentAmp.scss'
import '../../../styles/modals.css'
/**
 ** Effect selection modal
 */
class AddEffectModal extends Component {
  toggleModal (e) {
    if (e.target.className === 'addEffectModal' || e.target.className === 'closeButton') {
      document.querySelector('.addEffectModal').style.display = 'none'
    }
  }

  render () {
    return (
      <div className='addEffectModal' onClick={this.toggleModal}>
        <div className='modal-content animate' >
          <div className='modalContainer'>
            <h2>Add Effect</h2>
            <div className='buttonContainer'>
              <button onClick={this.props.addEffectModule} value='cabinet' type='button'>Cabinet</button>
              <button onClick={this.props.addEffectModule} value='chorus' type='button'>Chorus</button>
              <button onClick={this.props.addEffectModule} value='compressor' type='button'>Compressor</button>
              <button onClick={this.props.addEffectModule} value='delay' type='button'>Delay</button>
              <button onClick={this.props.addEffectModule} value='distortion' type='button'>Distortion</button>
              <button onClick={this.props.addEffectModule} value='eq1' type='button'>EQ1</button>
              <button onClick={this.props.addEffectModule} value='eq3' type='button'>EQ3</button>
              <button onClick={this.props.addEffectModule} value='eq5' type='button'>EQ5</button>
              <button onClick={this.props.addEffectModule} value='flanger' type='button'>Flanger</button>
              <button onClick={this.props.addEffectModule} value='gain' type='button'>Gain</button>
              <button onClick={this.props.addEffectModule} value='passfilter' type='button'>Passfilter</button>
              <button onClick={this.props.addEffectModule} value='phaser' type='button'>Phaser</button>
              <button onClick={this.props.addEffectModule} value='reverb' type='button'>Reverb</button>
              <button onClick={this.props.addEffectModule} value='tremolo' type='button'>Tremolo</button>
            </div>
          </div>
          <div className='modalContainer'>
            <button onClick={this.toggleModal}className='closeButton' type='button'>Close</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddEffectModal
