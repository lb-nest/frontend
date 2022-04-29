import { Typography } from '@mui/material';
import React from 'react';

interface ChatListMenuItemProps {
  name: string;
  count?: number;
  onClick?: () => void;
}

export const ChatListMenuItem: React.FC<ChatListMenuItemProps> = ({ name, count, onClick }) => {
  return (
    <Typography
      component='span'
      padding='5px'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      onClick={onClick}>
      <Typography component='span'>{name}</Typography>
      <Typography component='span'>{count}</Typography>
    </Typography>
  );
};
