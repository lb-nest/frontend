import { createTheme } from '@mui/material';
import { palette } from './palette';

export const theme = createTheme({
  palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
        '*': {
          '&::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 4,
            backgroundColor: '#00000040',
          },
        },
      },
    },
  },
});
