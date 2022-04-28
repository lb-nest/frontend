import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

interface AppThemeProviderProps {
  children?: React.ReactNode;
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
