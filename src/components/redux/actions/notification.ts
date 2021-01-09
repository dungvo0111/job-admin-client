import { SnackbarMessage, SnackbarKey, OptionsObject } from 'notistack'

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

export type MessageType = 'Success' | 'Failure'

type ShowNotificationAction = {
  type: typeof SHOW_NOTIFICATION
  payload: {
    message: SnackbarMessage
    options?: OptionsObject
  }
}

type HideNotificationAction = {
  type: typeof HIDE_NOTIFICATION
  payload: {
    key: SnackbarKey
  }
}

export type NotificationActions =
  | ShowNotificationAction
  | HideNotificationAction

export function showNotification(
  message: SnackbarMessage,
  options?: OptionsObject
): NotificationActions {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      message,
      options: {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        ...options,
      },
    },
  }
}

export function hideNotification(key: SnackbarKey): NotificationActions {
  return {
    type: HIDE_NOTIFICATION,
    payload: {
      key,
    },
  }
}
