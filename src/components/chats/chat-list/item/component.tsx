import { AddTaskOutlined } from '@mui/icons-material';
import { Avatar, Box, ButtonBase, IconButton, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import * as locales from 'date-fns/locale';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chat } from '../../../../core/types';

interface ChatListItemProps extends Chat {
  showAssign?: boolean;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  id,
  contact,
  messages,
  showAssign = true,
}) => {
  const { i18n } = useTranslation();

  const router = useRouter();

  const handleOpen: React.MouseEventHandler = () => {
    router.push(`/chats/${id}`);
  };

  const handleAssign: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <ButtonBase
      component='div'
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        padding: '5px 15px',
        bgcolor: Number(router.query.id) === id && '#e1e1e1',
      }}
      onClick={handleOpen}>
      <Avatar
        sx={{
          flexShrink: 0,
        }}
      />
      <Box flexGrow={1} ml='10px' overflow='hidden'>
        <Typography component='div' variant='body1' noWrap>
          {contact.name}
        </Typography>
        <Typography component='div' variant='body2' noWrap>
          {messages[0].content[0].text}
        </Typography>
      </Box>
      <Box
        sx={{
          flexShrink: 0,
        }}>
        <Typography component='span' variant='body2'>
          {formatDistanceToNow(new Date(messages[0].updatedAt), {
            addSuffix: true,
            locale: locales[i18n.language],
          })}
        </Typography>
      </Box>
      {showAssign && (
        <IconButton
          sx={{
            position: 'absolute',
            left: 15,
            color: '#000',
            zIndex: 1,
          }}
          onClick={handleAssign}>
          <AddTaskOutlined />
        </IconButton>
      )}
    </ButtonBase>
  );
};
