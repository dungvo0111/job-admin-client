import { CreateJobPayload, CREATE_JOB, GET_ALL_JOBS, GET_JOB, JobsActions, } from "../types";


export function getAllJobs(): JobsActions {
  return {
    type: GET_ALL_JOBS,
  }
}

export function createJob(payload: CreateJobPayload): JobsActions {
  return {
    type: CREATE_JOB,
    payload
  }
}

export function getJob(jobId: string): JobsActions {
  return {
    type: GET_JOB,
    jobId
  }
}



