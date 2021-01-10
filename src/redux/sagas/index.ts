import { fork, all } from 'redux-saga/effects'

import {
  loginRequest,
  fetchUserLoginState,
  logout,
} from 'pages/login/redux/saga'
import { getAllJobs, getJob, getAllUsers, getAllCustomers, createJob, createMessage, getAllMessages, getTasks, createTask, updateTask } from 'pages/home/redux/sagas'

export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(fetchUserLoginState),
    fork(logout),
    fork(getAllJobs),
    fork(getJob),
    fork(getAllUsers),
    fork(getAllCustomers),
    fork(createJob),
    fork(createMessage),
    fork(getAllMessages),
    fork(createTask),
    fork(getTasks),
    fork(updateTask),
  ])
}
