import { takeEvery, call, put } from 'redux-saga/effects'

import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  User
} from '../types'
import Services from '../services'
import { showNotification } from 'components/redux/actions'

export function* getAllUsers() {
  yield takeEvery(GET_ALL_USERS, function* () {
    try {
      const res: User[] = yield call(Services.getAllUsers)

      if (res) {
        yield put({
          type: GET_ALL_USERS_SUCCESS,
          payload: res,
        })
      }
    } catch (error) {
      yield put(showNotification(error.response.data.message, {
        variant: 'error',
      }))
    }
  }
  )
}
