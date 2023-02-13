import { HelpOutline, NotificationsOffOutlined, NotificationsOutlined } from '@mui/icons-material';
import { Badge, Box, IconButton, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { t } = useTranslation();

  const [permission, setPermission] = React.useState(Notification.permission);

  const handleRequestPermission = (): void => {
    if (permission === 'default') {
      Notification.requestPermission()
        .catch(() => {})
        .finally(() => {
          setPermission(Notification.permission);
        });
    }
  };

  return (
    <Box
      component='header'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      height={50}
      padding='0 15px'
      flexShrink={0}>
      <Box display='flex' alignItems='center'>
        <Image src='/icon.png' alt='icon' width={50} height={27} />
        <Typography
          component='h1'
          noWrap
          sx={{
            ml: '30px',
            fontSize: 24,
            fontWeight: 700,
          }}>
          {title}
        </Typography>
      </Box>
      <Box display='flex' alignItems='center'>
        <Tooltip
          title={t<string>(`notifications:permission.${Notification.permission}`)}
          placement='left'>
          <IconButton onClick={handleRequestPermission}>
            <Badge color='primary' variant='dot' invisible={permission !== 'default'}>
              {permission === 'granted' ? <NotificationsOutlined /> : <NotificationsOffOutlined />}
            </Badge>
          </IconButton>
        </Tooltip>
        <IconButton href='/docs' component={Link}>
          <HelpOutline />
        </IconButton>
      </Box>
    </Box>
  );
};
