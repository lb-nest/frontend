import { HelpOutline, NotificationsOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
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
        <IconButton>
          <NotificationsOutlined />
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
