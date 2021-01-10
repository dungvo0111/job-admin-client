export const GET_ALL_JOBS = 'GET_ALL_JOBS'
export const GET_ALL_JOBS_SUCCESS = 'GET_ALL_JOBS_SUCCESS'
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS'
export const GET_ALL_CUSTOMERS = 'GET_ALL_CUSTOMERS'
export const GET_ALL_CUSTOMERS_SUCCESS = 'GET_ALL_CUSTOMERS_SUCCESS'
export const CREATE_JOB = 'CREATE_JOB'
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS'

export type GetAllJobsAction = {
    type: typeof GET_ALL_JOBS
}

export type GetAllJobsSuccessAction = {
    type: typeof GET_ALL_JOBS_SUCCESS
    payload: Jobs[]
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

export type JobsActions =
    | GetAllJobsAction
    | GetAllJobsSuccessAction
    | CreateJobAction
    | CreateJobSuccessAction

export type UsersActions =
    | GetAllUsersAction
    | GetAllUsersSuccessAction

export type CustomersActions =
    | GetAllCustomersAction
    | GetAllCustomersSuccessAction

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