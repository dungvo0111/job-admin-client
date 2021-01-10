import { combineReducers } from 'redux'

import login from 'pages/login/redux/reducers'
import { notification } from 'components/redux/reducers'
import { jobs, users, customers } from 'pages/home/redux/reducers'
const createRootReducer = () =>
  combineReducers({
    login,
    notification,
    jobs,
    users,
    customers
  })

export default createRootReducer
