import { createTheme } from '@mui/material';
import { palette } from './palette';

export const theme = createTheme({
  typography: {
    fontFamily: ['Nunito', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
  palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
        '*': {
          '&::-webkit-scrollbar': {
            width: 6,
            height: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 2,
            backgroundColor: '#0000003b',
          },
        },
      },
    },
  },
});
