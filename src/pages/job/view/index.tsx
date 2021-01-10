import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { Backdrop, Button, Fade, IconButton, ListItemText, Menu, MenuItem, Modal, Tab, Tabs, TextField, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'redux/types'
import { createMessage, createTask, getAllJobs, getAllMessages, getAllTasks, getJob, updateTask } from 'pages/home/redux/actions'
import moment from 'moment'
import { Task } from 'pages/home/redux/types';

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        width: '50%'
    },
    titleContainer: {
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2)
    },
    contentContainer: {
        display: 'flex',
        minHeight: theme.spacing(80)
    },
    leftContent: {
        width: '65%',
        borderRight: '1px solid black',
        display: 'flex',
        flexDirection: 'column'
    },
    rightContent: {
        width: '35%'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '50%',
        padding: theme.spacing(1),
        borderBottom: '1px solid black'
    },
    infoElem: {
        textOverflow: 'ellipsis',
        marginTop: theme.spacing(1)
    },
    taskContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '50%',
        padding: theme.spacing(1),
        overflowY: 'auto'
    },
    taskHeader: {
        marginBottom: theme.spacing(2)
    },
    messagesContent: {
        height: '90%',
        padding: theme.spacing(2),
        overflowY: 'auto'
    },
    messagesInputContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '10%',
        alignItems: 'flex-end'
    },
    messageContainer: {
        padding: theme.spacing(1, 2),
        border: '1px solid black',
        borderRadius: theme.spacing(1.25),
        marginBottom: theme.spacing(3),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    messageInput: {
        borderTop: '1px solid black',
        borderRight: '1px solid black',
        padding: theme.spacing(0, 1),
        width: '90%',
        textDecoration: 'none'
    },
    task: {
        marginBottom: theme.spacing(1),
        borderRadius: theme.spacing(0.5),
        border: '1px solid black',
        textAlign: 'center'
    },
    taskTitle: {

    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        minWidth: theme.spacing(40)
    },
    singleTaskContainer: {
        padding: theme.spacing(1, 2),
        borderBottom: '1px solid black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

const JobView = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { jobId } = useParams<{ jobId: string }>()
    const job = useSelector((state: AppState) => state.jobs.find(job => job._id === jobId))
    const messages = useSelector((state: AppState) => state.messages)
    const tasks = useSelector((state: AppState) => state.tasks)

    const isAssigned = (messId: string) => {
        let assigned = false
        tasks.forEach(task => {
            task.messages.forEach(mess => {
                if (mess._id === messId) {
                    assigned = true
                }
            })
        })

        return assigned
    }

    useEffect(() => {
        dispatch(getJob(jobId))
        dispatch(getAllMessages(jobId))
        dispatch(getAllTasks(jobId))
    }, [dispatch, jobId])

    const jobData = job && [{
        key: "ID",
        data: job._id
    }, {
        key: "Status",
        data: job.status
    },
    {
        key: "Date State",
        data: moment(job.startDate).format('DD/MM/YYYY')
    },
    {
        key: "Date End",
        data: moment(job.endDate).format('DD/MM/YYYY')
    },
    {
        key: "Info",
        data: job.info
    },]

    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        setText(target.value);
    };

    const handleSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(createMessage({ text, jobId }))
        setText('')
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleMessageClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    };

    const handleMessageClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(null)
    }

    const handleAssignTask = (taskId: string, messId: string, mess: string) => {

        dispatch(updateTask({
            taskId: taskId,
            jobId: jobId,
            dueDate: (jobData && new Date(jobData[3].data)) as Date,
            messages: [...tasks.filter(task => task._id === taskId)[0].messages, {
                jobId: jobId,
                text: mess,
                _id: messId
            }]
        }))
        setAssignModalOpen(false)
    }

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [showTaskModalOpen, setShowTaskModalOpen] = useState(false);
    const [taskOpen, setTaskOpen] = useState<Task | undefined>()

    const handleCreateClick = (messId: string, mess: string) => {
        dispatch(createTask({
            jobId: jobId,
            dueDate: (jobData && new Date(jobData[3].data)) as Date,
            messages: [{
                jobId: jobId,
                text: mess,
                _id: messId
            }]
        }))
        setCreateModalOpen(true);
        setAnchorEl(null);
    }

    const handleAssignClick = (messId: string, mess: string) => {
        setAssignModalOpen(true);
        setAnchorEl(null);
    }

    const handleShowTaskClick = (task: Task) => {
        setTaskOpen(task)
        setShowTaskModalOpen(true)
    }

    const handleAssignModalClose = () => {
        setAssignModalOpen(false);
    };

    const handleCreateModalClose = () => {
        setCreateModalOpen(false);
    };

    const handleShowTaskModalClose = () => {
        setTaskOpen(undefined)
        setShowTaskModalOpen(false);
    };

    type Props = {
        messId: string,
        mess: string
    }

    const CreateTaskModal = ({ messId, mess }: Props) => (
        <Modal
            className={classes.modal}
            open={createModalOpen}
            onClose={handleCreateModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={createModalOpen}>
                <div className={classes.paper}>
                    <div className={classes.singleTaskContainer}>
                        <Typography>
                            {mess}
                        </Typography>
                    </div>
                    <div className={classes.singleTaskContainer}>
                        <Typography>
                            Due Date: {jobData && jobData[3].data}
                        </Typography>
                    </div>
                </div>
            </Fade>
        </Modal>
    )

    const AssignTaskModal = ({ messId, mess }: Props) => (
        <Modal
            className={classes.modal}
            open={assignModalOpen}
            onClose={handleAssignModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={assignModalOpen}>
                <div className={classes.paper}>
                    {tasks.map((task, index) => (
                        <MenuItem key={index} className={classes.singleTaskContainer} onClick={() => handleAssignTask(task._id, messId, mess)}>
                            <Typography>
                                Task {index + 1}
                            </Typography>
                        </MenuItem>
                    ))}
                </div>
            </Fade>
        </Modal>
    )

    type TaskModalProps = {
        task?: Task
    }

    const ShowTaskModal = ({ task }: TaskModalProps) => {
        if (!task) return <></>
        return (
            <Modal
                className={classes.modal}
                open={showTaskModalOpen}
                onClose={handleShowTaskModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showTaskModalOpen}>
                    <div className={classes.paper}>
                        {task.messages.map((elem, index) => (
                            <div key={index} className={classes.singleTaskContainer}>
                                <Typography>
                                    {elem.text}
                                </Typography>
                                <IconButton aria-label="show mess" onClick={() => { }}>
                                    <RemoveRedEyeIcon />
                                </IconButton>
                            </div>
                        ))}
                        <div className={classes.singleTaskContainer}>
                            <Typography>
                                Due Date: {moment(task.dueDate).format('DD/MM/YYYY')}
                            </Typography>
                        </div>
                    </div>
                </Fade>
            </Modal>
        )
    }


    if (!job) return <></>

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className={classes.titleContainer}>
                    <Typography>
                        JOB: {job.name}
                    </Typography>
                </div>
                <div className={classes.contentContainer}>
                    <div className={classes.leftContent}>
                        <div className={classes.messagesContent}>
                            {messages.map(mess => (
                                <div key={mess._id} className={classes.messageContainer} style={{ borderColor: isAssigned(mess._id) ? 'green' : 'black' }}>
                                    <Typography>
                                        {mess.text}
                                    </Typography>
                                    <IconButton aria-label="more options"
                                        onClick={handleMessageClick}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={!!anchorEl}
                                        onClose={handleMessageClose}
                                        TransitionComponent={Fade}
                                        getContentAnchorEl={null}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <MenuItem onClick={() => handleCreateClick(mess._id, mess.text)}>
                                            <ListItemText primary="Create Task" />
                                        </MenuItem>
                                        <MenuItem onClick={() => handleAssignClick(mess._id, mess.text)}>
                                            <ListItemText primary="Assign to Task" />
                                        </MenuItem>
                                    </Menu>
                                    <CreateTaskModal messId={mess._id} mess={mess.text} />
                                    <AssignTaskModal messId={mess._id} mess={mess.text} />
                                </div>
                            ))}
                        </div>
                        <div className={classes.messagesInputContainer}>
                            <TextField
                                name='text'
                                type="text"
                                autoComplete="off"
                                value={text}
                                onChange={handleChange}
                                className={classes.messageInput}
                                inputProps={{ disableUnderline: true }}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleSend}
                            >
                                Send
                        </Button>
                        </div>
                    </div>
                    <div className={classes.rightContent}>
                        <div className={classes.infoContainer}>
                            {jobData && jobData.map((elem, index) => (
                                <Typography key={index} className={classes.infoElem}>
                                    {elem.key}: {elem.data}
                                </Typography>
                            ))}
                        </div>
                        <div className={classes.taskContainer}>
                            <Typography className={classes.taskHeader}>Task list</Typography>
                            {tasks.length > 0 && tasks.map((task, index) => (
                                <>
                                    <Button key={index} className={classes.task} size='small' onClick={() => handleShowTaskClick(task)}>
                                        <Typography className={classes.taskTitle}>Task {index + 1}</Typography>
                                    </Button>
                                </>
                            ))}
                            <ShowTaskModal task={taskOpen} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobView
