export const GET_ALL_JOBS = 'GET_ALL_JOBS'
export const GET_ALL_JOBS_SUCCESS = 'GET_ALL_JOBS_SUCCESS'
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS'
export const GET_ALL_CUSTOMERS = 'GET_ALL_CUSTOMERS'
export const GET_ALL_CUSTOMERS_SUCCESS = 'GET_ALL_CUSTOMERS_SUCCESS'
export const CREATE_JOB = 'CREATE_JOB'
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS'
export const GET_JOB = 'GET_JOB'
export const GET_JOB_SUCCESS = 'GET_JOB_SUCCESS'
export const CREATE_MESSAGE = 'CREATE_MESSAGE'
export const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS'
export const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES'
export const GET_ALL_MESSAGES_SUCCESS = 'GET_ALL_MESSAGES_SUCCESS'
export const GET_ALL_TASKS = 'GET_ALL_TASKS'
export const GET_ALL_TASKS_SUCCESS = 'GET_ALL_TASKS_SUCCESS'
export const CREATE_TASK = 'CREATE_TASK'
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS'
export const UPDATE_TASK = 'UPDATE_TASK'
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS'

export type GetAllJobsAction = {
    type: typeof GET_ALL_JOBS
}

export type GetAllJobsSuccessAction = {
    type: typeof GET_ALL_JOBS_SUCCESS
    payload: Jobs[]
}

export type GetJobAction = {
    type: typeof GET_JOB
    jobId: string
}

export type GetJobSuccessAction = {
    type: typeof GET_JOB_SUCCESS
    payload: Jobs
}

export type GetAllUsersAction = {
    type: typeof GET_ALL_USERS
}

export type GetAllUsersSuccessAction = {
    type: typeof GET_ALL_USERS_SUCCESS
    payload: User[]
}

export type GetAllCustomersAction = {
    type: typeof GET_ALL_CUSTOMERS
}

export type GetAllCustomersSuccessAction = {
    type: typeof GET_ALL_CUSTOMERS_SUCCESS
    payload: Customer[]
}

export type CreateJobAction = {
    type: typeof CREATE_JOB
    payload: CreateJobPayload
}

export type CreateJobSuccessAction = {
    type: typeof CREATE_JOB_SUCCESS
    payload: Jobs
}

export type CreateMessageAction = {
    type: typeof CREATE_MESSAGE
    payload: CreateMessagePayload
}

export type CreateMessageSuccessAction = {
    type: typeof CREATE_MESSAGE_SUCCESS
    payload: Message
}

export type GetAllMessagesAction = {
    type: typeof GET_ALL_MESSAGES
    jobId: string
}

export type GetAllMessagesSuccessAction = {
    type: typeof GET_ALL_MESSAGES_SUCCESS
    payload: Message[]
}

export type GetAllTasksAction = {
    type: typeof GET_ALL_TASKS
    jobId: string
}

export type GetAllTasksSuccessAction = {
    type: typeof GET_ALL_TASKS_SUCCESS
    payload: Task[]
}

export type CreateTaskAction = {
    type: typeof CREATE_TASK
    payload: CreateTaskPayload
}

export type CreateTaskSuccessAction = {
    type: typeof CREATE_TASK_SUCCESS
    payload: Task
}

export type UpdateTaskAction = {
    type: typeof UPDATE_TASK
    payload: UpdateTaskPayload
}

export type UpdateTaskSuccessAction = {
    type: typeof UPDATE_TASK_SUCCESS
    payload: Task
}

export type JobsActions =
    | GetAllJobsAction
    | GetAllJobsSuccessAction
    | CreateJobAction
    | CreateJobSuccessAction
    | GetJobAction
    | GetJobSuccessAction

export type UsersActions =
    | GetAllUsersAction
    | GetAllUsersSuccessAction

export type CustomersActions =
    | GetAllCustomersAction
    | GetAllCustomersSuccessAction

export type MessagesActions =
    | CreateMessageAction
    | CreateMessageSuccessAction
    | GetAllMessagesAction
    | GetAllMessagesSuccessAction

export type TasksActions =
    | GetAllTasksAction
    | GetAllTasksSuccessAction
    | CreateTaskAction
    | CreateTaskSuccessAction
    | UpdateTaskAction
    | UpdateTaskSuccessAction

export type Status = 'Pending' | 'Ongoing' | 'Closed'

export interface Jobs {
    _id: string
    name: string
    location: string
    startDate: Date
    endDate: Date
    status: Status
    info: string
    customerId: string
    customerName: string
    userIds: string[]
}

export interface User {
    _id: string
    lastName: string
    firstName: string
    email: string
}

export interface Customer {
    lastName: string
    firstName: string
    email: string
    location: string
}

export interface Message {
    _id: string
    text: string
    jobId: string
    taskId?: string
}

export interface Task {
    _id: string
    dueDate: Date
    jobId: string
    messages: Message[]
}

export interface CreateTaskPayload {
    jobId: string
    dueDate: Date
    messages: Message[]
}

export interface UpdateTaskPayload {
    taskId: string
    jobId: string
    dueDate?: Date
    messages?: Message[]
}

export type JobFormPayload = {
    name: string,
    userName: string,
    customerName: string,
    location: string,
    startDate: string,
    endDate: string,
    status: Status,
    info: string,
    userIds: string[]
}

export type CreateJobPayload = {
    name: string,
    userName: string,
    userIds: string[],
    customerName: string,
    location: string,
    startDate: Date,
    endDate: Date,
    status: Status,
    info: string
}

export type CreateMessagePayload = {
    text: string,
    jobId: string
}

export type JobFormElemName =
    | "name"
    | "customerName"
    | "userName"
    | "location"
    | "startDate"
    | "endDate"
    | "status"
    | "info"

export type JobFormElem = Array<{
    label: string;
    name: JobFormElemName
}>;