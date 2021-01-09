import { NotificationState } from 'components/redux/types'
import {
  NotificationActions,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from '../actions/notification'

const defaultState: NotificationState = []

export function notification(
  state = defaultState,
  action: NotificationActions
): NotificationState {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      const found = state.find(
        (notif) => notif.message === action.payload.message
      )
      if (found) {
        return state
      }

      return [
        ...state,
        {
          key: new Date().getTime() + Math.random(),
          ...action.payload,
        },
      ]

    case HIDE_NOTIFICATION:
      const newState = [...state]
      const index = newState.findIndex((n) => n.key === action.payload.key)
      if (index >= 0) {
        newState.splice(index, 1)
      }
      return newState

    default:
      return state
  }
}
