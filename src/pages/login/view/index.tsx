import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Copyright from '../components/CopyRight'
import Login from '../components/Login'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: '100vw',
        height: '8vh',
        textAlign: 'center',
        margin: '12.5vh auto 4.5vh auto',
    },
    logo: {
        width: theme.spacing(25),
    },
    title: {
        fontSize: theme.spacing(2.25),
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    paper: {
        padding: theme.spacing(8),
        textAlign: 'center',
        width: '30vw',
        height: '50vh',
        margin: '0 35vw 25vh auto',
        borderRadius: theme.spacing(1.25),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8F8F8  0% 0% no-repeat padding-box',
    },
    avatar: {
        margin: theme.spacing(1),
        border: `${theme.spacing(0.075)} solid ${theme.palette.primary.dark}`,
        color: theme.palette.primary.dark,
        backgroundColor: 'transparent',
        marginBottom: theme.spacing(3),
    },
}))

const LoginView = () => {
    const classes = useStyles()

    return (
        <Grid component="main" className={classes.root}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Login />
                <Copyright />
            </div>
        </Grid>
    )
}

export default LoginView
