import { Box } from '@mui/material';
import React from 'react';

interface MenuProps {
  children: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <Box display='flex' flexDirection='column' mt={7} flexShrink={0}>
      {children}
    </Box>
  );
};
