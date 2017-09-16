import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signinUser } from '../../actions/index'

class Signin extends Component {
  state = {
    email: '',
    password: ''
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFormSubmit = () => {
    this.props.signinUser(this.state.email, this.state.password)
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>
            {this.props.errorMessage}
          </strong>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        <input type='text' name='email' value={this.state.email} onChange={this.changeHandler} placeholder='Email' />
        <input type='text' name='password' value={this.state.password} onChange={this.changeHandler} placeholder='Password' />
        {this.renderAlert()}
        <button onClick={this.handleFormSubmit}>Sign In</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.error,
    authenticated: state.auth.authenticated }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signinUser: signinUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
