import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
import React from 'react';

interface ChatListItemProps {}

export const ChatListItem: React.FC<ChatListItemProps> = ({}) => {
  return (
    <ButtonBase
      component='div'
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '5px 15px',
      }}>
      <Avatar
        sx={{
          flexShrink: 0,
        }}
      />
      <Box flexGrow={1} ml='10px'>
        <Typography variant='body1'>name</Typography>
        <Typography variant='body2'>text</Typography>
      </Box>
      <Box
        sx={{
          flexShrink: 0,
        }}>
        ts
      </Box>
    </ButtonBase>
  );
};
