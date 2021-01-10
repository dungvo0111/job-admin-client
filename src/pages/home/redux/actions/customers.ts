import { GET_ALL_CUSTOMERS, CustomersActions } from "../types";


export function getAllCustomers(): CustomersActions {
  return {
    type: GET_ALL_CUSTOMERS,
  }
}

