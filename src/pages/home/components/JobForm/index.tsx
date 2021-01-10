import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, InputLabel, MenuItem, Select, TextField, Theme } from '@material-ui/core'

import { createJob } from 'pages/home/redux/actions'
import { JobFormElem, JobFormPayload } from 'pages/home/redux/types'
import { AppState } from 'redux/types'
import moment from 'moment'

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    },
    formElem: {
        marginBottom: theme.spacing(2)
    },
    button: {
        alignSelf: 'center',
        marginTop: theme.spacing(2)
    }
}))

const jobFormElem: JobFormElem = [
    { label: "Job Name", name: "name" },
    { label: "Customer", name: "customerName" },
    { label: "User", name: "userName" },
    { label: "Date Start", name: "startDate" },
    { label: "Date End", name: "endDate" },
    { label: "Status", name: "status" },
    { label: "Info", name: "info" },
];

const JobForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const users = useSelector((state: AppState) => state.users)
    const customers = useSelector((state: AppState) => state.customers)
    const status = ["Pending", "Ongoing", "Closed"]
    const initState: JobFormPayload = {
        name: "",
        customerName: "",
        userName: "",
        userIds: [],
        location: "",
        startDate: "",
        endDate: "",
        status: "Pending",
        info: ""
    };
    const [jobFormPayload, setJobFormPayload] = useState(initState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const newPayload = {
            ...jobFormPayload,
            [target.name]: target.value,
        };

        setJobFormPayload(newPayload);
    };

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string | undefined, value: unknown }>) => {
        const target = event.target;
        const newPayload = {
            ...jobFormPayload,
            [target.name as string]: target.value,
        };

        setJobFormPayload(newPayload);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const location = customers.find(cus => cus.firstName === jobFormPayload.customerName)?.location
        const userId = users.find(user => user.firstName === jobFormPayload.userName)?._id
        const payload = {...jobFormPayload,
        location: location as string,
        userIds: [userId as string],
        startDate: moment(jobFormPayload.startDate).toDate(),
        endDate: moment(jobFormPayload.endDate).toDate()
        }

        console.log(moment(jobFormPayload.endDate).toDate())
        console.log(moment(jobFormPayload.startDate).toDate())
        console.log(payload)
        dispatch(createJob(payload));
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
            {jobFormElem.map((elem) => {
                return (elem.name === 'customerName' || elem.name === 'userName' || elem.name === 'status') ? (
                    <div className={classes.formElem} key={elem.label}>
                        <InputLabel id="select-label">{elem.label}</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select-label"
                            name={elem.name}
                            value={jobFormPayload[elem.name]}
                            onChange={handleSelectChange}
                            fullWidth
                        >
                            {elem.name === 'customerName' && customers.map(cus => (
                                <MenuItem value={cus.firstName} key={cus.firstName}>{cus.firstName}</MenuItem>
                            ))}
                            {elem.name === 'userName' && users.map(users => (
                                <MenuItem value={users.firstName} key={users.firstName}>{users.firstName}</MenuItem>
                            ))}
                            {elem.name === 'status' && status.map(s => (
                                <MenuItem value={s} key={s}>{s}</MenuItem>
                            ))}
                        </Select>
                    </div>
                )
                    : (<div className={classes.formElem} key={elem.label}>
                        <TextField
                            id={elem.name}
                            name={elem.name}
                            label={elem.label}
                            type="text"
                            autoComplete="off"
                            value={jobFormPayload[elem.name]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    )
            })}
            <Button
                variant="contained"
                type="submit"
                size="small"
                className={classes.button}
            >
                Submit
        </Button>
        </form>
    )
}

export default JobForm
