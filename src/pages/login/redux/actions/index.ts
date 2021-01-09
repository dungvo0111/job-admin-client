import { History } from 'history'

import {
  LOGIN_REQUEST,
  FETCH_USER_LOGIN_STATE,
  LoginActions,
  LOGOUT,
} from '../types'

export function loginRequest(
  email: string,
  password: string,
  history: History,
): LoginActions {
  return {
    type: LOGIN_REQUEST,
    payload: {
      email,
      password,
      history
    }
  }
}

export function fetchUserLoginState(history: History): LoginActions {
  return {
    type: FETCH_USER_LOGIN_STATE,
    payload: {
      history,
    },
  }
}

export function logout(history: History, tokenExpired?: boolean): LoginActions {
  return {
    type: LOGOUT,
    payload: {
      history,
      tokenExpired,
    },
  }
}
