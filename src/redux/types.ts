//Google login
import { LoginState } from 'pages/login/redux/types'

//Notification
import { NotificationState } from 'components/redux/types'


// App
export type AppState = {
  notification: NotificationState
  login: LoginState
}

//Partial type for nested object
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}
