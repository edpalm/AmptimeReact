import React from 'react'
import GuitarAmp from './guitarAmp/GuitarAmp'

class AudioController extends React.Component {
  render () {
    // send loggedin status as prop, render preset tools if logged in.
    return (
      <GuitarAmp />
    )
  }
}

export default AudioController
