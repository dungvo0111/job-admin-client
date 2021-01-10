import { GET_ALL_USERS, UsersActions } from "../types";


export function getAllUsers(): UsersActions {
  return {
    type: GET_ALL_USERS,
  }
}

