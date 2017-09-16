// TODO: MOVE AXIOS CALLS TO TASK SPECIFIC FILES
// TODO: DO THE ".catch()"'S  ACTUALLY WORK?

import axios from 'axios'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, DID_GET_ISSUES, DISPLAY_ISSUE, REMOVE_ISSUES, REMOVE_DISPLAY_ISSUE, UPDATE_DISPLAY_ISSUE, DELETE_ISSUE, MODIFY_ISSUES } from './action_types'

const ROOT_URL = 'http://localhost:3000/api/v1/'

export const signinUser = (email, password) => {
  const URL = `${ROOT_URL}signin`

  return (dispatch) => {
    axios.post(URL, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('jwt', res.data.token)
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'))
      })
  }
}

export const signupUser = (email, password) => {
  const URL = `${ROOT_URL}signup`

  return (dispatch) => {
    axios.post(URL, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('jwt', res.data.token)
      })
      .catch(res => {
        dispatch(authError(res.error))
      })
  }
}

export const signoutUser = () => {
  localStorage.removeItem('jwt')
  return { type: UNAUTH_USER }
}

export const getIssues = (filterInput, type) => {
  const location = filterInput.location,
    start_date = filterInput.start_date,
    end_date = filterInput.end_date,
    issue_type = filterInput.issue_type,
    num_complaints = filterInput.num_complaints,
    URL = `${ROOT_URL}issues`

  return (dispatch) => {
    axios.post(URL, {location, start_date, end_date, issue_type, num_complaints, type}, {headers: {'x-access-token': localStorage.jwt}})
      .then(res => dispatch({
        type: DID_GET_ISSUES,
        payload: res.data
      }))
      .catch(res => {
        dispatch(authError(res.error))
      })
  }
}

export const displayIssue = (issue) => {
  return {
    type: DISPLAY_ISSUE,
    payload: issue
  }
}

export const updateIssue = (issueID, index, updatedIssueParts) => {
  const URL= `${ROOT_URL}issues`
  return (dispatch) => {
    axios.put(URL, {issueID, updatedIssueParts}, {headers: {'x-access-token': localStorage.jwt}})
      .then(res => {
        dispatch({
          type: UPDATE_DISPLAY_ISSUE,
          payload: res.data
        })
        dispatch({
          type: MODIFY_ISSUES,
          payload: {
            index: index,
            issue: res.data
          }
        })
      })
      .catch(res => {
        dispatch(authError(res.error))
      })
  }
}

export const deleteIssue = (issue) => {
  const URL = `${ROOT_URL}issues`

  return (dispatch) => {
    axios.delete(URL, {headers: {'x-access-token': localStorage.jwt, 'issue_id': issue._id}})
      .then(res => dispatch({
        type: DELETE_ISSUE,
        payload: issue.index
      }))
      .catch(res => {
        dispatch(authError(res.error))
      })
  }
}

export const clearIssues = () => {
  return { type: REMOVE_ISSUES }
}

export const clearDisplay = () => {
  return { type: REMOVE_DISPLAY_ISSUE }
}

export  const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
