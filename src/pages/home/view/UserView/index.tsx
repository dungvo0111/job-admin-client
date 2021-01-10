import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { AppState } from 'redux/types'
import { getAllUsers } from 'pages/home/redux/actions'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    titlesContainer: {
        marginBottom: theme.spacing(2),
        display: 'flex',
    },
    title: {
        '&:not(:last-child)': {
            marginRight: theme.spacing(2)
        },
        width: theme.spacing(45),
        textTransform: 'uppercase'
    },
    contentContainer: {

    },
    row: {
        display: 'flex'
    },
    cell: {
        '&:not(:last-child)': {
            marginRight: theme.spacing(2)
        },
        width: theme.spacing(45),
        textOverflow: 'ellipsis'
    },
}))

const titles = ['First name', 'Last name', 'Email']

const UserView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const usersData = useSelector((state: AppState) => state.users)
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    if (!usersData) return <></>

    return (
        <div className={classes.wrapper}>
            <div className={classes.titlesContainer}>
                {titles.map(title => (
                    <div key={title} className={classes.title}>
                        <Typography>
                            {title}
                        </Typography>
                    </div>
                ))}
            </div>
            <div className={classes.contentContainer}>
                {usersData && usersData.map(user => {
                    const {_id, firstName, lastName, email} = user
                    return (<div key={_id} className={classes.row}>
                        {[firstName, lastName, email].map((elem, index) => (
                            <Typography key={index} className={classes.cell}>
                                {elem}
                            </Typography>
                        ))}
                    </div>

                )})}
            </div>
        </div>
    )
}

export default UserView
