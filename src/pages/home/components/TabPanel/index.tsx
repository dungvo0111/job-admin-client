import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'

export interface TabPanelProps {
    children?: React.ReactNode
    index: any
    value: any
    [key: string]: any
    maxHeight?: string | number
}

export function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, maxHeight, ...other } = props

    const useStyles = makeStyles((theme: Theme) => ({
        tabPanelStyle: {
            maxHeight: maxHeight ?? 600,
        },
    }))

    const classes = useStyles()

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className={classes.tabPanelStyle}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    )
}

export default TabPanel
