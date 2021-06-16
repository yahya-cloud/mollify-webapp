import { USER, LOGOUT } from '../actions/actionTypes'

const authReducer = (state = false, action) => {
  switch (action.type) {
    case USER:
      return action?.payload

    case LOGOUT:
      return false

    default:
      return state
  }
}

export default authReducer
