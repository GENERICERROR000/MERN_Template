import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signoutUser } from '../../actions/index'

class Signout extends Component {
  componentWillMount () {
    this.props.signoutUser()
  }

  render () {
    return <h1>OK... SEE YA LATER, BYE!</h1>
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signoutUser: signoutUser
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signout)
