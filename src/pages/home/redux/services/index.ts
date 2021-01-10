import axios from 'axios'

import { CreateJobPayload, Customer, JobFormPayload, Jobs, User } from '../types'

export default {
  async getAllJobs(): Promise<Jobs[]> {
    return await axios
      .get<Jobs[]>('jobs')
      .then(res => res.data)
  },

  async createJob(payload: CreateJobPayload): Promise<Jobs> {
    console.log(payload)
    return await axios
      .post<Jobs>('jobs', payload)
      .then(res => res.data)
  },

  async getAllUsers(): Promise<User[]> {
    return await axios
      .get<User[]>('user')
      .then(res => res.data)
  },

  async getAllCustomers(): Promise<Customer[]> {
    return await axios
      .get<Customer[]>('customers')
      .then(res => res.data)
  },
}
