import { LoginState } from 'pages/login/redux/types'

const LOGIN_RESPONSE_KEY = 'loginResponse'

export default {
  getLoginResponse: (): LoginState | null => {
    try {
      return JSON.parse(localStorage.getItem(LOGIN_RESPONSE_KEY) || '')
    } catch (error) {
      return null
    }
  },

  saveLoginResponse: (loginResponse: LoginState) => {
    localStorage.setItem(LOGIN_RESPONSE_KEY, JSON.stringify(loginResponse))
  },

  removeLoginResponse: () => {
    localStorage.removeItem(LOGIN_RESPONSE_KEY)
  },
}
