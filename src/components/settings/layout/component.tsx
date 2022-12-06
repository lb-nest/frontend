import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../layout';
import { Menu, MenuItem } from '../menu';

interface SettingsLayoutProps {
  children?: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Layout i18n='common:pages.settings'>
      <Box display='flex' width='100%' height='100%' bgcolor='#f0f1f3'>
        <Box
          display='flex'
          flexDirection='column'
          width='100%'
          height='100%'
          maxWidth={360}
          overflow='auto'>
          <Menu>
            <MenuItem href='/settings/project'>{t<string>('settings:project')}</MenuItem>
            <MenuItem href='/settings/profile'>{t<string>('settings:profile')}</MenuItem>
          </Menu>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          flexGrow={1}
          padding='50px 0'
          borderLeft='1px solid #0000003b'
          overflow='auto'>
          {children}
        </Box>
      </Box>
    </Layout>
  );
};
