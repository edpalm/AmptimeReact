import React from 'react'
import GuitarAmp from './apps/guitarAmp/GuitarAmp'

class AppSelector extends React.Component {
  render () {
    // send loggedin status as prop, render preset tools if logged in.
    return (
      <GuitarAmp />
    )
  }
}

export default AppSelector
