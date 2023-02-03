import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface AuthHeaderProps {
  title?: string;
  button?: React.ReactNode;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, button }) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Box display='flex' alignItems='center'>
        <Image src='/icon.png' alt='logo' width={64} height={35} />
        <Box width={2} height={35} bgcolor='#0000003b' m={[0, 1]} />
        <Typography>{title}</Typography>
      </Box>
      {button}
    </Box>
  );
};
