import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import AppBar from '../AppBar'
import Routes from 'Routes'
import { logout } from 'pages/login/redux/actions'
import { colors } from 'constants/styles'

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    overflow: 'auto',
    background: colors.customPalette.gray.light,
  },
  content: {
    marginTop: theme.spacing(10),
   
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(0, 10),
  }
}))

const AuthApp = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          dispatch(logout(history, true))
        }
        return Promise.reject(error)
      }
    )
  }, [history, dispatch])

  return (
    <main className={classes.container}>
      <AppBar />
      <div className={classes.content}>
        <Paper className={classes.paper}>
          <Routes />
        </Paper>
      </div>
    </main>
  )
}

export default AuthApp
