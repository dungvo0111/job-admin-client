import { createMuiTheme } from '@material-ui/core/styles'
import { cardBoxShadow, fontFamily } from 'constants/styles'

let theme = createMuiTheme({
    typography: {
        fontFamily: fontFamily,
    },
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: '10px',
            },
            elevation1: {
                boxShadow: cardBoxShadow,
            },
        },
    },
    spacing: factor => `${0.5 * factor}rem`,
})

export default createMuiTheme(theme)
