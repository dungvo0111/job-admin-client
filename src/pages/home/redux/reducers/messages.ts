import {
    CREATE_MESSAGE_SUCCESS,
    GET_ALL_MESSAGES_SUCCESS,
    Message,
    MessagesActions,
} from '../types'

const defaultState: Message[] = []

export function messages(
    state = defaultState,
    action: MessagesActions
): Message[] {
    switch (action.type) {
        case GET_ALL_MESSAGES_SUCCESS:
            return [
                ...action.payload
            ]

        case CREATE_MESSAGE_SUCCESS:
            const newState = [...state]
            newState.push(action.payload)
            return [
                ...newState,
            ]

        default:
            return state
    }
}
