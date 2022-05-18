import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SettingsMenu: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box display='flex' flexDirection='column' padding='50px 15px' flexShrink={0}>
      <Link href='/settings/project' passHref>
        <Typography
          component='a'
          fontWeight={700}
          sx={{
            color: '#000000',
            textDecoration: 'none',
          }}>
          {t<string>('settings:project')}
        </Typography>
      </Link>
      <Box padding='10px'>
        <Link href='/settings/team' passHref>
          <Typography
            component='a'
            padding='5px'
            sx={{
              color: '#000000',
              textDecoration: 'none',
            }}>
            {t<string>('settings:team')}
          </Typography>
        </Link>
      </Box>
      <Link href='/settings/profile' passHref>
        <Typography
          component='a'
          fontWeight={700}
          sx={{
            color: '#000000',
            textDecoration: 'none',
          }}>
          {t<string>('settings:profile')}
        </Typography>
      </Link>
      <Link href='/settings' passHref>
        <Typography
          component='a'
          fontWeight={700}
          sx={{
            mt: '15px',
            color: '#000000',
            textDecoration: 'none',
          }}>
          {t<string>('settings:system')}
        </Typography>
      </Link>
    </Box>
  );
};
