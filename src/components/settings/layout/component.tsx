import { Box } from '@mui/material';
import React from 'react';
import { Layout } from '../../layout';
import { SettingsMenu } from '../menu';

interface SettingsLayoutProps {
  children?: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  return (
    <Layout i18n='common:pages.settings'>
      <Box display='flex' width='100%' height='100%' bgcolor='#f7f7f7'>
        <Box
          display='flex'
          flexDirection='column'
          width='100%'
          height='100%'
          maxWidth={360}
          overflow='auto'>
          <SettingsMenu />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          flexGrow={1}
          borderLeft='1px solid #0002'
          padding='50px 0'
          overflow='auto'>
          {children}
        </Box>
      </Box>
    </Layout>
  );
};
