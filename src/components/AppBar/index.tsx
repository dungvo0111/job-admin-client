import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar as MuiAppBar, ListItemIcon, ListItemText, Menu, MenuItem, Theme, Typography } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock'
import IconButton from '@material-ui/core/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { logout } from 'pages/login/redux/actions'
import { colors } from 'constants/styles'
import { AppState } from 'redux/types';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: 100,
    borderBottom: `1px solid ${colors.customPalette.gray.dark}`,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0.5, 1),
    background: colors.customPalette.gray.light,
    boxShadow: 'none',
    height: theme.spacing(7)
  },
  text: {
    fontSize: theme.spacing(2),
    color: 'black'
  },
  wrapper: {
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center'
  },
  accountIcon: {
    margin: theme.spacing(0, 2)
  },
  menuIcon: {
    minWidth: theme.spacing(6.5),
    '&& svg': {
      fill: colors.customPalette.darkGray.dark,
    },
  },
}))

export default function AppBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const name = useSelector((state: AppState) => state.login.firstName)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleLogoutbuttonClick = () => {
    dispatch(logout(history))
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  return (
    <>
      <MuiAppBar
        className={classes.appBar}
      >
        <div className={classes.wrapper}>
          <Typography className={classes.text}>Hello {name}</Typography>
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.accountIcon}
          >
            <AccountCircleIcon />
          </IconButton>
        </div>
        <Menu
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClick={handleClose}
        >
          <MenuItem onClick={handleLogoutbuttonClick}>
            <ListItemIcon className={classes.menuIcon}>
              <LockIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
      </MuiAppBar>
    </>
  )
}
