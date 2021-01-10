import { makeStyles, Theme, Typography, Link } from '@material-ui/core'
import { Jobs } from 'pages/home/redux/types'
import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
export interface JobRowProps {
    job: Jobs
}

const JobRow = ({ job }: JobRowProps) => {
    const useStyles = makeStyles((theme: Theme) => ({
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
        link: {
            textDecoration: 'none',
            cursor: 'pointer',
        }
    }))

    const classes = useStyles()
    const history = useHistory()

    const { _id, name, customerName, location, startDate, endDate, status } = job

    const transformDate = (date: Date) => {
        return moment(date).format('DD/MM/YYYY')
    }

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        history.push(`/job/${_id}`)
    }

    return (
        <div className={classes.row}>
            <div className={classes.cell}>
                <Link
                    onClick={handleClick}
                    className={classes.link}
                >
                    {_id}
                </Link>
            </div>
            {[name, customerName, location, transformDate(startDate), transformDate(endDate), status].map((value, index) => (
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
