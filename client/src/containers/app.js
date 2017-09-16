import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from '../components/navbar'
import Signin from '../components/auth/signin'
import Signout from '../components/auth/signout'
import Signup from '../components/auth/signup'
import Home from '../containers/home'
import Portal from '../containers/portal'
import NewIssues from '../containers/NewIssues'
import ActiveIssues from '../containers/ActiveIssues'
import ArchivedIssues from '../containers/ArchivedIssues'
import CreateIssue from '../containers/CreateIssue'
import BigMap from '../containers/BigMap'
import Data from '../containers/data'
import NotFound from '../components/404'
import { connect } from 'react-redux'

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
            <Route exact path='/portal' render={() => this.checkAuth(Portal)} />
            <Route exact path='/issues/new' render={() => this.checkAuth(NewIssues)} />
            <Route exact path='/issues/active' render={() => this.checkAuth(ActiveIssues)} />
            <Route exact path='/issues/archive' render={() => this.checkAuth(ArchivedIssues)} />
            <Route exact path='/issues/create' render={() => this.checkAuth(CreateIssue)} />
            <Route exact path='/issues/map' render={() => this.checkAuth(BigMap)} />
            {/* <Route exact path='/data' render={() => this.checkAuth(Data)} /> */}
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
