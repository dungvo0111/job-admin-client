import {
  LOGIN_SUCCESS,
  LoginActions,
  LoginState,
  LOGOUT,
} from '../types'

const defaultState: LoginState = {
  email: '',
  userId: '',
  firstName: '',
  lastName: '',
  accessToken: '',
}

export default function login(
  state: LoginState = defaultState,
  action: LoginActions
): LoginState {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, ...action.payload }
    }

    case LOGOUT:
      return defaultState

    default:
      return state
  }
}
