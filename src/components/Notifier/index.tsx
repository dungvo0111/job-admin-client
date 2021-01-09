import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar, SnackbarKey } from 'notistack'

import { AppState } from 'redux/types'
import { hideNotification } from 'components/redux/actions'

let displayed: SnackbarKey[] = []

const Notifier = () => {
  const notifications = useSelector((state: AppState) => state.notification)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter(key => id !== key)]
  }

  useEffect(() => {
    notifications.forEach(({ message, key, options }) => {
      if (displayed.includes(key)) return

      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, key) => {
          if (options?.onClose) {
            options.onClose(event, reason, key)
          }
        },
        onExited: (_event, key) => {
          dispatch(hideNotification(key))
          removeDisplayed(key)
        },
        autoHideDuration: 1500,
      })

      storeDisplayed(key)
    })
  }, [notifications, dispatch, enqueueSnackbar, closeSnackbar])

  return null
}

export default Notifier
