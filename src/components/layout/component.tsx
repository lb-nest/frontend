import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './header';
import { Sidebar } from './sidebar';

interface LayoutProps {
  i18n?: string;
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ i18n, children }) => {
  const { t } = useTranslation();

  return (
    <Box display='flex' flexDirection='column' height='100vh' overflow='hidden'>
      <Header title={i18n && t<string>(i18n)} />
      <Box display='flex' flexGrow={1} height='100%'>
        <Sidebar />
        <Box component='main' width='100%' height='calc(100vh - 50px)'>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
