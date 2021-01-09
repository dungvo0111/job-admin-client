import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    light: {
        color: '#000000',
        fontSize: '0.8rem',
    },
}))

type CopyrightProps = {
    lightTheme?: boolean
}

const Copyright = ({ lightTheme = false }: CopyrightProps) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography
                variant="body2"
                align="center"
                className={lightTheme ? classes.light : ''}
            >
                {'Copyright © '}
                <Link
                    color="inherit"
                    href="https://github.com/dungvo0111"
                    target="_blank"
                >
                    Dung Vo
        </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    )
}

export default Copyright
