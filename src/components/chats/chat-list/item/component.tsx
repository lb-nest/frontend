import { useMutation } from '@apollo/client';
import { AddTaskOutlined } from '@mui/icons-material';
import { Avatar, Box, ButtonBase, IconButton, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ACCEPT_CONTACT } from '../../../../core/api';
import { Chat, ContactStatus } from '../../../../core/types';

interface ChatListItemProps extends Chat {
  showAssign?: boolean;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  id,
  contact,
  messages,
  showAssign = contact.assignedTo == null && contact.status === ContactStatus.Open,
}) => {
  const { t } = useTranslation();

  const router = useRouter();

  const [acceptContact] = useMutation(ACCEPT_CONTACT);

  const handleOpen: React.MouseEventHandler = () => {
    router.push(`/chats/${id}`);
  };

  const handleAssign: React.MouseEventHandler = (e) => {
    e.stopPropagation();

    toast
      .promise(
        acceptContact({
          variables: {
            id: contact.id,
          },
        }),
        t<any, any>('common:promise', { returnObjects: true }),
      )
      .catch(() => null);
  };

  return (
    <ButtonBase
      component='div'
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        padding: '5px 15px',
        bgcolor: Number(router.query.id) === id && '#c4c8d0',
      }}
      onClick={handleOpen}>
      <Avatar
        src={contact.avatarUrl}
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
        <Typography component='span' variant='caption'>
          {format(new Date(messages[0].updatedAt), 'dd.MM.yyyy')}
        </Typography>
      </Box>
      {showAssign && (
        <IconButton
          sx={{
            position: 'absolute',
            left: 15,
            color: '#000000',
            zIndex: 1,
          }}
          onClick={handleAssign}>
          <AddTaskOutlined />
        </IconButton>
      )}
    </ButtonBase>
  );
};
