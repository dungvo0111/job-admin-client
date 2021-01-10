import { takeEvery, call, put } from 'redux-saga/effects'

import {
  CreateJobAction,
  CreateJobPayload,
  CREATE_JOB,
  CREATE_JOB_SUCCESS,
  GetJobAction,
  GetJobSuccessAction,
  GET_ALL_JOBS,
  GET_ALL_JOBS_SUCCESS,
  GET_JOB,
  GET_JOB_SUCCESS,
  JobFormPayload,
  Jobs
} from '../types'
import Services from '../services'
import { showNotification } from 'components/redux/actions'

export function* getAllJobs() {
  yield takeEvery(GET_ALL_JOBS, function* () {
    try {
      const res: Jobs[] = yield call(Services.getAllJobs)

      if (res) {
        yield put({
          type: GET_ALL_JOBS_SUCCESS,
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

export function* createJob() {
  yield takeEvery(CREATE_JOB, function* (payload: CreateJobAction) {
    try {
      const res = yield call(Services.createJob, payload.payload)

      if (res.job) {
        yield put({
          type: CREATE_JOB_SUCCESS,
          payload: res.job,
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

export function* getJob() {
  yield takeEvery(GET_JOB, function* (payload: GetJobAction) {
    try {
      const res: Jobs = yield call(Services.getJob, payload.jobId)

      if (res) {
        yield put({
          type: GET_JOB_SUCCESS,
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
