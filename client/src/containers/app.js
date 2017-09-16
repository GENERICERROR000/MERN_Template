import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Signin from '../components/auth/signin'
import Signout from '../components/auth/signout'
import Signup from '../components/auth/signup'
import NotFound from '../components/404'
import { connect } from 'react-redux'
import '../css/index.css'

class App extends Component {

  checkAuth = (Component) => {
    return this.props.authenticated ? <Component /> : <Redirect to="/" />
  }

  render () {
    return (
      <Router>
        <div>
          <Route path='/' component={Navbar} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/signout' component={Signout} />
            <Route exact path='/signup' render={() => this.checkAuth(Signup)} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(App)
