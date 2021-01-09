import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

import { LOGOUT, Logout } from '../types'
import LocalStorage from 'browserStorage/LocalStorage'
import { showNotification } from 'components/redux/actions'

export function* logout() {
  yield takeEvery(LOGOUT, function* ({
    payload: { history, tokenExpired },
  }: Logout) {
    try {
      LocalStorage.removeLoginResponse()
      delete axios.defaults.headers.common['Authorization']
      if (tokenExpired) {
        yield put(
          showNotification('Token expired', {
            variant: 'error',
          })
        )
      }
      yield history.push('/login')
    } catch (error) {
      yield put(
        showNotification('Logout failed', {
          variant: 'error',
        })
      )
    }
  })
}
