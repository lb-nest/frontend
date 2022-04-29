import { Typography } from '@mui/material';
import React from 'react';

interface ChatListMenuItemProps {
  name: string;
  count: number;
}

export const ChatListMenuItem: React.FC<ChatListMenuItemProps> = ({ name, count }) => {
  return (
    <Typography
      padding='5px'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
      <Typography>{name}</Typography>
      <Typography>{count}</Typography>
    </Typography>
  );
};
