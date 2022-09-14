import { HelpOutline, NotificationsOffOutlined, NotificationsOutlined } from '@mui/icons-material';
import { Badge, Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
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
        <Image src='/icon.png' width={50} height={27} />
        <Typography
          component='span'
          sx={{
            ml: '30px',
            fontSize: 24,
            fontWeight: 700,
          }}>
          {title}
        </Typography>
      </Box>
      <Box display='flex' alignItems='center'>
        <IconButton onClick={handleRequestPermission}>
          <Badge color='primary' variant='dot' invisible={permission !== 'default'}>
            {permission === 'granted' ? <NotificationsOutlined /> : <NotificationsOffOutlined />}
          </Badge>
        </IconButton>
        <Link href='/docs' passHref>
          <IconButton>
            <HelpOutline />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};
