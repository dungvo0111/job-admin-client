import { createMuiTheme } from '@material-ui/core/styles'
import { cardBoxShadow, colors, fontFamily } from 'constants/styles'

let theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.customPalette.darkGray.dark,
        },
        secondary: {
            main: colors.customPalette.yellow.main,
        },
    },
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
        MuiTab: {
            root: {
                '&.Mui-selected': {
                    color: colors.customPalette.yellow.main,
                },
            },
        },
    },
    spacing: factor => `${0.5 * factor}rem`,
})

export default createMuiTheme(theme)
