import {
    CREATE_MESSAGE_SUCCESS,
    CREATE_TASK_SUCCESS,
    GET_ALL_MESSAGES_SUCCESS,
    GET_ALL_TASKS_SUCCESS,
    Message,
    MessagesActions,
    Task,
    TasksActions,
    UPDATE_TASK_SUCCESS,
} from '../types'

const defaultState: Task[] = []

export function tasks(
    state = defaultState,
    action: TasksActions
): Task[] {
    switch (action.type) {
        case GET_ALL_TASKS_SUCCESS:
            return [
                ...action.payload
            ]

        default:
            return state
    }
}
