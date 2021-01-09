import { takeEvery, call, put } from 'redux-saga/effects'
import axios from 'axios'
import jwtDecode from "jwt-decode";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LoginRequest,
  FETCH_USER_LOGIN_STATE,
  LoginState,
  Logout,
  LoginResponse,
} from '../types'
import LoginServices from '../services'
import LocalStorage from 'browserStorage/LocalStorage'
import { showNotification } from 'components/redux/actions'

export function* loginRequest() {
  yield takeEvery(
    LOGIN_REQUEST,
    function* ({ payload: { email, password, history } }: LoginRequest) {
      try {
        const res: LoginResponse = yield call(LoginServices.loginRequest, email, password)

        if (res) {
          const decoded = jwtDecode(res.token) as Omit<LoginState, 'accessToken'>
          const payload = { ...decoded, accessToken: res.token }

          yield put({
            type: LOGIN_SUCCESS,
            payload: payload,
          })
          LocalStorage.saveLoginResponse(payload)
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${payload.accessToken}`

          yield put(showNotification(res.message, {
            variant: 'success',
          }))

          history.push('/')

        }
      } catch (error) {
        yield put(showNotification(error.response.data.message, {
          variant: 'error',
        }))
      }
    }
  )
}

export function* fetchUserLoginState() {
  yield takeEvery(
    FETCH_USER_LOGIN_STATE,
    function* ({ payload: { history } }: Logout) {
      try {
        const loginDetail = LocalStorage.getLoginResponse()

        if (!loginDetail?.accessToken) {
          throw new Error()
        }

        yield put({
          type: LOGIN_SUCCESS,
          payload: loginDetail,
        })
      } catch (error) {
        yield put(
          showNotification('Access token not found',
            {
              variant: 'error',
            })
        )
        yield history.push('/login')
      }
    }
  )
}
