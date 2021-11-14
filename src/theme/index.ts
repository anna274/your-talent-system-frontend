import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E3B44',
      dark: '#1D2A31',
      light: '#485864',
      contrastText: '#E5E5E5',
    },
    secondary: {
      main: '#2E3B44',
      dark: '#1D2A31',
      light: '#485864',
      contrastText: '#E5E5E5',
    },
    text: {
      primary: '#E5E5E5',
      secondary: '#82929B',
    },
    error: {
      main: '#C65942',
    },
    warning: {
      main: '#EEB34E',
    },
    success: {
      main: '#52B792',
    },
  },
  typography: {
    fontSize: 20,
    fontFamily: ['Lato', 'sans-serif'].join(','),
    h1: {
      fontSize: '3.6rem',
    },
    h2: {
      fontSize: '2.8rem',
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: '#52B792',
        '&:hover': {
          backgroundColor: '#5ACBA2',
        },
      },
      containedSecondary: {
        backgroundColor: '#EEB34E',
        color: '#2E3B44',
        '&:hover': {
          backgroundColor: '#F3C473',
        },
      },
      root: {
        fontSize: 18,
        textTransform: 'none',
        height: 36,

        '&.danger': {
          backgroundColor: '#C65942',
          color: '#2E3B44',
          '&:hover': {
            backgroundColor: '#D67560',
          },
        },
      },
    },
    MuiFilledInput: {
      root: {
        color: '#1D2A31',
        borderRadius: 4,
        backgroundColor: '#E5E5E5',
        '&:hover': {
          backgroundColor: '#E5E5E5',
          '&:before': {
            display: 'none',
          },
        },
        '&.Mui-focused': {
          backgroundColor: '#E5E5E5',
          color: '#1D2A31',
        },
      },
      underline: {
        '&:after': {
          display: 'none',
        },
      },
    },
    MuiButtonBase: {
      root: {
        '&.MuiPickersDay-day': {
          color: '#82929B',
        },
        '&.MuiPickersDay-daySelected': {
          color: '#E5E5E5',
        },
      },
    },
    MuiChip: {
      root: {
        fontSize: 16,
      },
    },
    MuiFab: {
      root: {
        '&.MuiFab-primary:hover': {
          backgroundColor: '#52B792',
        },
      },
    },
  },
});