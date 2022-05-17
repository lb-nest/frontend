import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SettingsMenu: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box padding='50px 15px' flexShrink={0}>
      <Typography
        fontWeight={700}
        sx={{
          cursor: 'pointer',
        }}>
        {t<string>('settings:project.title')}
      </Typography>
      <Box padding='10px'>
        <Typography
          component='div'
          padding='5px'
          sx={{
            cursor: 'pointer',
          }}>
          {t<string>('settings:project.users')}
        </Typography>
      </Box>
      <Typography
        fontWeight={700}
        sx={{
          cursor: 'pointer',
        }}>
        {t<string>('settings:user.title')}
      </Typography>
      <Box padding='10px'>
        <Typography
          component='div'
          padding='5px'
          sx={{
            cursor: 'pointer',
          }}>
          {t<string>('settings:user.projects')}
        </Typography>
      </Box>
      <Typography
        fontWeight={700}
        sx={{
          cursor: 'pointer',
        }}>
        {t<string>('settings:system')}
      </Typography>
    </Box>
  );
};
