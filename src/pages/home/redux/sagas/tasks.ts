import { takeEvery, call, put } from 'redux-saga/effects'

import {
    CreateJobAction,
    CreateJobPayload,
    CreateTaskAction,
    CREATE_JOB,
    CREATE_JOB_SUCCESS,
    CREATE_TASK,
    CREATE_TASK_SUCCESS,
    GetAllTasksAction,
    GetJobAction,
    GetJobSuccessAction,
    GET_ALL_JOBS,
    GET_ALL_JOBS_SUCCESS,
    GET_ALL_TASKS,
    GET_ALL_TASKS_SUCCESS,
    GET_JOB,
    GET_JOB_SUCCESS,
    JobFormPayload,
    Jobs,
    Task,
    UpdateTaskAction,
    UPDATE_TASK,
    UPDATE_TASK_SUCCESS
} from '../types'
import Services from '../services'
import { showNotification } from 'components/redux/actions'
import { getAllTasks} from '../actions'
export function* getTasks() {
    yield takeEvery(GET_ALL_TASKS, function* (payload: GetAllTasksAction) {
        try {
            const res: Task[] = yield call(Services.getAllTasks, payload.jobId)

            if (res) {
                yield put({
                    type: GET_ALL_TASKS_SUCCESS,
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

export function* createTask() {
    yield takeEvery(CREATE_TASK, function* (payload: CreateTaskAction) {
        try {
            const res = yield call(Services.createTask, payload.payload)

            if (res) {
                yield put({
                    type: CREATE_TASK_SUCCESS,
                    payload: res,
                })
                yield put(getAllTasks(payload.payload.jobId))
            }
        } catch (error) {
            yield put(showNotification(error.response.data.message, {
                variant: 'error',
            }))
        }
    }
    )
}

export function* updateTask() {
    yield takeEvery(UPDATE_TASK, function* (payload: UpdateTaskAction) {
        try {
            const res = yield call(Services.updateTask, payload.payload)

            if ((res as any).updatedTask) {
                yield put(getAllTasks(payload.payload.jobId))
            }
        } catch (error) {
            yield put(showNotification(error.response.data.message, {
                variant: 'error',
            }))
        }
    }
    )
}
