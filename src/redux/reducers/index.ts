import { combineReducers } from 'redux'

import login from 'pages/login/redux/reducers'
import { notification } from 'components/redux/reducers'

const createRootReducer = () =>
  combineReducers({
    login,
    notification,
  })

export default createRootReducer
