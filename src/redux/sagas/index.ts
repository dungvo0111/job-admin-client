import { fork, all } from 'redux-saga/effects'

import {
  loginRequest,
  fetchUserLoginState,
  logout,
} from 'pages/login/redux/saga'

export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(fetchUserLoginState),
    fork(logout),
  ])
}
