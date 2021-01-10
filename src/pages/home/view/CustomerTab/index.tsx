import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { AppState } from 'redux/types'
import { Typography } from '@material-ui/core'
import { getAllCustomers } from 'pages/home/redux/actions/customers'


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
        display: 'flex',
        marginBottom: theme.spacing(2)
    },
    cell: {
        '&:not(:last-child)': {
            marginRight: theme.spacing(2)
        },
        width: theme.spacing(45),
        textOverflow: 'ellipsis'
    },
}))

const titles = ['First name', 'Last name', 'Email', 'Location']

const CustomerView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const customersData = useSelector((state: AppState) => state.customers)
    useEffect(() => {
        dispatch(getAllCustomers())
    }, [dispatch])


    if (!customersData) return <></>

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
                {customersData && customersData.map(customer => (
                    <div key={customer.email} className={classes.row}>
                        {Object.values(customer).map((elem, index) => (
                            <Typography key={index} className={classes.cell}>
                                {elem}
                            </Typography>
                        ))}
                    </div>

                ))}
            </div>
        </div>
    )
}

export default CustomerView
