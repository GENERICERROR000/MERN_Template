import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signupUser } from '../../actions/index'

class Signup extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirm: ''
  }
  
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFormSubmit = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      // TODO: DISPLAY ERROR THAT FIELDS DO NOT MATCH
    }

    this.props.signupUser(this.state.email, this.state.password)
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
        <input type='password' name='password' value={this.state.password} onChange={this.changeHandler} placeholder='Password' />
        <input type='password' name='passwordConfirm' value={this.state.passwordConfirm} onChange={this.changeHandler} placeholder='Confirm Password' />
        {this.renderAlert()}
        <button onClick={this.handleFormSubmit}>Sign Up</button>
      </div>
    )
  }

}

function mapStateToProps (state) {
  return { errorMessage: state.error, authenticated: state.auth.authenticated }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signupUser: signupUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
