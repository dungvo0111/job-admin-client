import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { AppState } from 'redux/types'
import { getAllJobs } from 'pages/home/redux/actions'
import { Backdrop, Button, Fade, Modal, Typography } from '@material-ui/core'
import JobRow from 'pages/home/components/JobRow'
import { Jobs } from 'pages/home/redux/types'
import JobForm from 'pages/home/components/JobForm'


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
    createButton: {
        alignSelf: 'flex-end',
        marginTop: theme.spacing(3)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
}))

const titles = ['Job Id', 'Job Name', 'Customer', 'Location', 'Date Start', 'Date End', 'Status']

const JobView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const jobsData = useSelector((state: AppState) => state.jobs)
    useEffect(() => {
        dispatch(getAllJobs())
    }, [dispatch])

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!jobsData) return <></>

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
                {jobsData && jobsData.map(job => (
                    <JobRow key={job._id} job={job} />

                ))}
            </div>
            <Button
                variant="contained"
                size="small"
                onClick={handleOpen}
                className={classes.createButton}
            >
                Create
            </Button>

            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Create new job</h2>
                        <JobForm />
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default JobView
