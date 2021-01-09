import axios from 'axios'

import { LoginState } from '../types'

export default {
  async loginRequest(email: string, password: string): Promise<LoginState> {
    return await axios
      .post<LoginState>(`user/signIn`, {
        email, password
      })
      .then(res => res.data)
  },
}
