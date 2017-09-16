import { DISPLAY_ISSUE, UPDATE_DISPLAY_ISSUE, REMOVE_DISPLAY_ISSUE } from '../actions/action_types'

export default (state = false, action) => {
  if (action.error) {
    return state
  }

  switch (action.type) {
    case DISPLAY_ISSUE:
      return {...action.payload}
     case UPDATE_DISPLAY_ISSUE:
      return {...action.payload}
    case REMOVE_DISPLAY_ISSUE:
      return state = false
    default:
      return state
  }
}
