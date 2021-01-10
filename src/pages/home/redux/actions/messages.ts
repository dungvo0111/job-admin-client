import { CreateMessagePayload, CREATE_MESSAGE, MessagesActions, GET_ALL_MESSAGES } from "../types";

export function getAllMessages(jobId: string): MessagesActions {
    return {
        type: GET_ALL_MESSAGES,
        jobId
    }
}

export function createMessage(payload: CreateMessagePayload): MessagesActions {
    return {
        type: CREATE_MESSAGE,
        payload
    }
}