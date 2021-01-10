import {
  Jobs, JobsActions,
  GET_ALL_JOBS_SUCCESS,
  CREATE_JOB_SUCCESS,
} from '../types'

const defaultState: Jobs[] = []

export function jobs(
  state = defaultState,
  action: JobsActions
): Jobs[] {
  switch (action.type) {
    case GET_ALL_JOBS_SUCCESS:
      return [
        ...action.payload
      ]

    case CREATE_JOB_SUCCESS:
      const newState = [...state]
      newState.push(action.payload)
      return [
        ...newState,
      ]

    default:
      return state
  }
}
