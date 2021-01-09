import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Theme } from '@material-ui/core'

import { loginRequest } from 'pages/login/redux/actions'
import { LoginFormElem, LoginPayload } from 'pages/login/redux/types'

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        padding: theme.spacing(3)
    },
    formElem: {
        marginBottom: theme.spacing(2)
    }
}))

const signInFormElem: LoginFormElem = [
    { label: "Email", name: "email" },
    { label: "Password", name: "password" },
];

const Login = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const initState = {
        email: "",
        password: "",
    };
    const [signInPayload, setSignInPayload] = useState(initState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const newPayload: LoginPayload = {
            ...signInPayload,
            [target.name]: target.value,
        };
        setSignInPayload(newPayload);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {email, password} = signInPayload
        dispatch(loginRequest(email, password, history));
      };

    return (
        <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
            {signInFormElem.map((elem) => (
                <div className={classes.formElem} key={elem.label}>
                    <TextField
                        id={elem.name}
                        name={elem.name}
                        label={elem.label}
                        type={elem.name === "password" ? "password" : "text"}
                        autoComplete={elem.name === "password" ? "on" : "off"}
                        value={signInPayload[elem.name]}
                        onChange={handleChange}
                        required
                    />
                </div>
            ))}
            <Button
                variant="contained"
                type="submit"
                size="small"
            >
                Log In
        </Button>
        </form>
    )
}

export default Login
