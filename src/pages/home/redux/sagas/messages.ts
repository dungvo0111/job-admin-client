import { takeEvery, call, put } from 'redux-saga/effects'

import {
    CREATE_MESSAGE,
    CreateMessageAction,
    Message,
    CREATE_MESSAGE_SUCCESS,
    GetAllMessagesAction,
    GET_ALL_MESSAGES,
    GET_ALL_MESSAGES_SUCCESS
} from '../types'
import Services from '../services'
import { showNotification } from 'components/redux/actions'

export function* createMessage() {
    yield takeEvery(CREATE_MESSAGE, function* (payload: CreateMessageAction) {
        try {
            const res: Message = yield call(Services.createMessage, payload.payload)

            if (res) {
                yield put({
                    type: CREATE_MESSAGE_SUCCESS,
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

export function* getAllMessages() {
    yield takeEvery(GET_ALL_MESSAGES, function* (payload: GetAllMessagesAction) {
        try {
            const res: Message[] = yield call(Services.getAllMessages, payload.jobId)

            if (res) {
                yield put({
                    type: GET_ALL_MESSAGES_SUCCESS,
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
