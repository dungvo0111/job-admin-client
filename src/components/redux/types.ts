import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack"

export type Notification = {
    message: SnackbarMessage
    key: SnackbarKey
    options?: Omit<OptionsObject, 'key'>
}

export type NotificationState = Notification[]