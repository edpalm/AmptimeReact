import React from 'react'

import GuitarAmp from './guitarAmp/GuitarAmp'

// send loggedin status as prop, render preset tools if logged in.
class AudioController extends React.Component {
  render () {
    return (
      <GuitarAmp />
    )
  }
}

export default AudioController
