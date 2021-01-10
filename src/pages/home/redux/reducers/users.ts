import {
    User, UsersActions,
    GET_ALL_USERS_SUCCESS,
} from '../types'

const defaultState: User[] = []

export function users(
    state = defaultState,
    action: UsersActions
): User[] {
    switch (action.type) {
        case GET_ALL_USERS_SUCCESS:
            return [
                ...action.payload
            ]

        default:
            return state
    }
}
