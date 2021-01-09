import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import createRootReducer from './reducers'
import rootSaga from './sagas'
import { AppState } from 'types'

const initState: AppState = {
  dataTable: {},
  ui: {},
  login: {
    id: '',
    email: '',
    avatar: '',
    firstName: '',
    lastName: '',
    accessToken: '',
    roles: [],
    permissions: [],
  },
  resources: {},
  submission: {
    submissions: [],
    submission: {
      testId: '',
      studentName: '',
      templateName: '',
      submittedDate: '',
      studentScore: 0,
      totalScore: 0,
      reviewRequired: false,
      submissions: [],
    },
  },
  selectionProcess: {
    rounds: [],
    studentProcess: null,
  },
  notification: [],
}

export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
      })
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  sagaMiddleware.run(rootSaga)

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
