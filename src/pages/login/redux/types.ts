import { History } from 'history'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const FETCH_USER_LOGIN_STATE = 'FETCH_USER_LOGIN_STATE'
export const LOGOUT = 'LOGOUT'

export type LoginResponse = {
    message: string
    token: string
}

export type LoginState = {
    email: string,
    userId: string,
    firstName: string,
    lastName: string,
    accessToken: string
}

export type LoginRequest = {
    type: typeof LOGIN_REQUEST
    payload: {
      email: string
      password: string
      history: History
    }
  }
  
  export type LoginSuccess = {
    type: typeof LOGIN_SUCCESS
    payload: {
      accessToken: string
      message: string
    }
  }
  
  export type FetchUserLoginState = {
    type: typeof FETCH_USER_LOGIN_STATE
    payload: {
      history: History
    }
  }
  
  export type Logout = {
    type: typeof LOGOUT
    payload: {
      history: History
      tokenExpired?: boolean
    }
  }
  
  export type LoginActions =
    | LoginRequest
    | LoginSuccess
    | FetchUserLoginState
    | Logout
  