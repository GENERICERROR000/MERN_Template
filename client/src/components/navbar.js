import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Navbar extends Component {

  render () {
    return (
      <ul id="nav-ul">
        <li><a href='/'><h3>HOME</h3></a></li>
        <li><a href='#'><h3>AAA</h3></a></li>
        <li><a href='#'><h3>BBB</h3></a></li>
        <li><a href='#'><h3>CCC</h3></a></li>
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Navbar)
