import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from '../media/logo.png'
import '../css/navbar.css'

class Navbar extends Component {
  renderLinks () {
    if (this.props.authenticated) {
      return (
        <Menu.Item position='right'>
          <Link to='/portal'><Button className="nav-button">Portal</Button></Link>
          <Link to='/signout'><Button className="nav-button">Sign Out</Button></Link>
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item position='right'>
          <Link to='/signin'><Button className="nav-button">Sign In </Button></Link>
          <Link to='/signup'><Button className="nav-button">Sign Up</Button></Link>
        </Menu.Item>
      )
    }
  }

  render () {
    return (
      <Menu className="navbar" secondary>
        <Menu.Item fitted>
          <Link to='/'><img className="logo" alt="logo" src={logo} /></Link>
        </Menu.Item>
        {this.renderLinks()}
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Navbar)
