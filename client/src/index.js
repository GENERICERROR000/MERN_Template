import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import axios from 'axios'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers/index'
import { AUTH_USER } from './actions/action_types'

const middleware = composeWithDevTools(applyMiddleware(reduxThunk))
const store = createStore(reducers, middleware)
const jwt = localStorage.jwt
const URL = 'http://localhost:3000/api/v1/auth'

const renderReactDOM = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#root')
  )
  registerServiceWorker()
}

const checkResp = (resp) => {
  resp.data.success ? store.dispatch({ type: AUTH_USER }) : localStorage.removeItem('jwt')
}

const handleResp = (resp) => {
  checkResp(resp)
  renderReactDOM()
}

if (jwt) {
  axios.get(URL, { headers: {'x-access-token': jwt} })
    .then(handleResp)
    .catch(renderReactDOM)
} else {
  renderReactDOM()
}
