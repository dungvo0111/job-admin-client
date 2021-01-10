import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Jobs } from 'pages/home/redux/types'
import React from 'react'
import moment from 'moment'
export interface JobRowProps {
    job: Jobs
}

const JobRow = ({ job }: JobRowProps) => {
    const useStyles = makeStyles((theme: Theme) => ({
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

    const classes = useStyles()

    const { _id, name, customerName, location, startDate, endDate, status } = job

    const transformDate = (date: Date) => {
        return moment(date).format('DD/MM/YYYY')
    }

    return (
        <div className={classes.row}>
            {[_id, name, customerName, location, transformDate(startDate), transformDate(endDate), status].map((value, index) => (
                <div key={index} className={classes.cell}>
                    <Typography>
                        {value}
                    </Typography>
                </div>
            ))}
        </div>
    )
}

export default JobRow
