import { CreateTaskPayload, CREATE_TASK, GET_ALL_TASKS, TasksActions, UpdateTaskPayload, UPDATE_TASK } from "../types";

export function getAllTasks(jobId: string): TasksActions {
    return {
        type: GET_ALL_TASKS,
        jobId
    }
}

export function createTask(payload: CreateTaskPayload): TasksActions {
    return {
        type: CREATE_TASK,
        payload
    }
}

export function updateTask(payload: UpdateTaskPayload): TasksActions {
    return {
        type: UPDATE_TASK,
        payload
    }
}