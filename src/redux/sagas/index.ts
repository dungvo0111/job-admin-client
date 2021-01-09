import { fork, all } from 'redux-saga/effects'

import {
  loginWithGoogle,
  fetchUserLoginState,
  logout,
} from 'features/login/redux/saga'
import { crud } from 'common/redux/sagas'
import {
  generateTest,
  getOneSubmission,
  getSubmissionList,
  updateSubmission,
} from 'features/tests/redux/sagas'
import { sendEmail } from 'features/mailTemplates/redux/sagas'
import {
  getCourseRounds,
  getStudentProcess,
} from 'features/courses/redux/sagas'

export default function* rootSaga() {
  yield all([
    fork(loginWithGoogle),
    fork(fetchUserLoginState),
    fork(logout),
    fork(generateTest),
    fork(sendEmail),
    fork(getSubmissionList),
    fork(getOneSubmission),
    fork(updateSubmission),
    fork(getCourseRounds),
    fork(getStudentProcess),
    ...crud(),
  ])
}
