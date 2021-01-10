import { takeEvery, call, put } from 'redux-saga/effects'

import {
  GET_ALL_CUSTOMERS,
  GET_ALL_CUSTOMERS_SUCCESS,
  Customer
} from '../types'
import Services from '../services'
import { showNotification } from 'components/redux/actions'

export function* getAllCustomers() {
  yield takeEvery(GET_ALL_CUSTOMERS, function* () {
    try {
      const res: Customer[] = yield call(Services.getAllCustomers)

      if (res) {
        yield put({
          type: GET_ALL_CUSTOMERS_SUCCESS,
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
