import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import axios from 'axios'
import { SnackbarProvider } from 'notistack'

import './index.scss'

import App from './App'

import LocalStorage from 'browserStorage/LocalStorage'
import makeStore from 'redux/store'
import theme from './theme'
import Notifier from 'components/Notifier'
import reportWebVitals from './reportWebVitals'

const store = makeStore()

const loginDetail = LocalStorage.getLoginResponse()
if (loginDetail?.accessToken) {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${loginDetail.accessToken}`
}
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI

const WithProvider = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2}>
        <Router>
          <App />
          <Notifier />
        </Router>
      </SnackbarProvider>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
