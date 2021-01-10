import {
    Customer, CustomersActions,
    GET_ALL_CUSTOMERS_SUCCESS,
} from '../types'

const defaultState: Customer[] = []

export function customers(
    state = defaultState,
    action: CustomersActions
): Customer[] {
    switch (action.type) {
        case GET_ALL_CUSTOMERS_SUCCESS:
            return [
                ...action.payload
            ]

        default:
            return state
    }
}
