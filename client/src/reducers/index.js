import { combineReducers } from 'redux'
import authReducer from './auth_reducer'
import issuesReducer from './issues_reducer'
import displayReducer from './display_reducer'

const Reducer = combineReducers({
  auth: authReducer,
  issues: issuesReducer,
  displayIssue: displayReducer
})

export default Reducer
