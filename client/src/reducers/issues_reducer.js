import { DID_GET_ISSUES, REMOVE_ISSUES, DELETE_ISSUE, MODIFY_ISSUES } from '../actions/action_types'

export default (state = [], action) => {
  if (action.error) {
    return state
  }

  switch (action.type) {
    case DID_GET_ISSUES:
      return [...action.payload]
    case MODIFY_ISSUES:
      let mIssues = [...state]
      mIssues.splice(action.payload.index, 1, action.payload.issue)
      return [...mIssues]
    case REMOVE_ISSUES:
      return []
    case DELETE_ISSUE:
      let dIssues = [...state]
      dIssues.splice(action.payload, 1)
      return [...dIssues]
    default:
      return state
  }
}
