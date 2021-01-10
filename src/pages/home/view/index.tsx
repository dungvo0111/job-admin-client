import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Tab, Tabs } from '@material-ui/core'

import TabPanel, { a11yProps } from '../components/TabPanel'
import JobView from './JobView'
import UserView from './UserView'
import CustomerView from './CustomerView'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../redux/actions'
import { getAllCustomers } from '../redux/actions'

const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
        borderBottom: '1px solid rgba(112, 112, 112, 0.1)',
    }
}))

const HomeView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const locationState = useLocation<{ tabId: number | undefined }>().state
    const tabId = locationState ? locationState.tabId : undefined
    const [value, setValue] = React.useState(tabId ?? 0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllCustomers())
    }, [dispatch])

    const panelItems = [
        {
            label: 'Jobs',
            index: 0,
        },
        {
            label: 'Users',
            index: 1,
        },
        {
            label: 'Customers',
            index: 2,
        },
    ]

    return (
        <>
            <Tabs value={value} onChange={handleChange} aria-label="tabs" className={classes.tabs}>
                {panelItems.map(item => (
                    <Tab
                        key={item.index}
                        label={item.label}
                        value={item.index}
                        {...a11yProps(item.index)}
                    />
                ))}
            </Tabs>
            <TabPanel
                value={value}
                index={0}
                maxHeight="none"
            >
                <JobView />
            </TabPanel>
            <TabPanel
                value={value}
                index={1}
                maxHeight="none"
            >
                <UserView />
            </TabPanel>
            <TabPanel
                value={value}
                index={2}
                maxHeight="none"
            >
                <CustomerView />
            </TabPanel>
        </>
    )
}

export default HomeView
