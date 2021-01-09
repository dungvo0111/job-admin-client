import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './App.scss'

import AuthApp from 'components/AuthApp'
import LoginView from 'pages/login/view'
import { fetchUserLoginState } from 'pages/login/redux/actions'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchUserLoginState(history))
  }, [dispatch, history])

  return (
    <Switch>
      <Route exact path="/login">
        <LoginView />
      </Route>
      <Route path="/">
        <AuthApp />
      </Route>
    </Switch>
  )
}

export default App
