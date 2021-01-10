//Login
import { LoginState } from 'pages/login/redux/types'

//Notification
import { NotificationState } from 'components/redux/types'

//Jobs
import { Customer, Jobs, Message, Task, User } from 'pages/home/redux/types'


// App
export type AppState = {
  notification: NotificationState
  login: LoginState
  jobs: Jobs[]
  users: User[]
  customers: Customer[]
  messages: Message[]
  tasks: Task[]
}

//Partial type for nested object
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}
