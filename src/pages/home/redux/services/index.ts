import axios from 'axios'

import { CreateJobPayload, CreateMessagePayload, CreateTaskPayload, Customer, JobFormPayload, Jobs, Message, Task, UpdateTaskPayload, User } from '../types'

export default {
  async getAllJobs(): Promise<Jobs[]> {
    return await axios
      .get<Jobs[]>('jobs')
      .then(res => res.data)
  },

  async createJob(payload: CreateJobPayload): Promise<Jobs> {
    return await axios
      .post<Jobs>('jobs', payload)
      .then(res => res.data)
  },

  async getJob(jobId: string): Promise<Jobs> {
    return await axios
      .get<Jobs>(`jobs/${jobId}`)
      .then(res => res.data)
  },

  async createMessage(payload: CreateMessagePayload): Promise<Message> {
    return await axios
      .post<Message>('messages', payload)
      .then(res => res.data)
  },

  async getAllMessages(jobId: string): Promise<Message[]> {
    return await axios
      .get<Message[]>(`messages/${jobId}`)
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

  async createTask(payload: CreateTaskPayload): Promise<Task> {
    return await axios
      .post<Task>(`tasks?jobId=${payload.jobId}`, payload)
      .then(res => res.data)
  },

  async getAllTasks(jobId: string): Promise<Task[]> {
    return await axios
      .get<Task[]>(`tasks?jobId=${jobId}`)
      .then(res => res.data)
  },

  async updateTask(payload: UpdateTaskPayload): Promise<Task> {
    console.log(payload)
    return await axios
      .put<Task>(`tasks/${payload.taskId}`, { dueDate: payload.dueDate, messages: payload.messages })
      .then(res => res.data)
  },
}
