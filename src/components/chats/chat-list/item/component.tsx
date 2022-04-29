import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Chat } from '../../../../core/types';

interface ChatListItemProps extends Chat {}

export const ChatListItem: React.FC<ChatListItemProps> = ({ id, contact, messages }) => {
  const router = useRouter();

  return (
    <ButtonBase
      component='div'
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '5px 15px',
        bgcolor: Number(router.query.id) === id && '#e1e1e1',
      }}
      onClick={() => {
        router.push(`/chats/${id}`);
      }}>
      <Avatar
        sx={{
          flexShrink: 0,
        }}
      />
      <Box flexGrow={1} ml='10px'>
        <Typography component='div' variant='body1'>
          {contact.name}
        </Typography>
        <Typography component='div' variant='body2'>
          {messages[0].content[0].text}
        </Typography>
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
