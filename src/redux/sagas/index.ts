import { fork, all } from 'redux-saga/effects'

import {
  loginRequest,
  fetchUserLoginState,
  logout,
} from 'pages/login/redux/saga'
import { getAllJobs, getAllUsers, getAllCustomers, createJob } from 'pages/home/redux/sagas'

export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(fetchUserLoginState),
    fork(logout),
    fork(getAllJobs),
    fork(getAllUsers),
    fork(getAllCustomers),
    fork(createJob)
  ])
}
