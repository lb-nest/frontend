import { useMutation } from '@apollo/client';
import { AddTaskOutlined } from '@mui/icons-material';
import { Avatar, Box, ButtonBase, IconButton, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { UPDATE_CONTACT } from '../../../../core/api';
import { AssigneeType, Chat, ContactStatus } from '../../../../core/types';
import { GuardContext } from '../../../guard-context';

interface ChatListItemProps extends Chat {
  showAssign?: boolean;
}

export const ChatListItem: React.FC<ChatListItemProps> = React.memo(
  ({
    channelId,
    accountId,
    contact,
    messages,
    showAssign = contact.assignedTo == null && contact.status === ContactStatus.Open,
  }) => {
    const id = `${channelId}:${accountId}`;

    const guard = React.useContext(GuardContext);

    const { t } = useTranslation();

    const router = useRouter();

    const [updateContact] = useMutation(UPDATE_CONTACT);

    const handleOpen: React.MouseEventHandler = () => {
      router.push(`/chats/${id}`);
    };

    const handleAssign: React.MouseEventHandler = (e) => {
      e.stopPropagation();

      toast
        .promise(
          updateContact({
            variables: {
              id: contact.id,
              assignedTo: {
                id: guard.payload?.id,
                type: AssigneeType.User,
              },
              status: ContactStatus.Open,
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
          width: '100%',
          position: 'relative',
          p: 2,
          bgcolor: router.query.id === id && 'rgba(0, 0, 0, 0.04)',
        }}
        onClick={handleOpen}>
        <Box display='flex' alignItems='center' width='100%'>
          <Avatar src={contact.avatarUrl} alt={contact.name} />
          {showAssign && (
            <IconButton
              sx={{
                position: 'absolute',
                left: 16,
                color: '#212121',
                zIndex: 1,
              }}
              onClick={handleAssign}>
              <AddTaskOutlined />
            </IconButton>
          )}
          <Box ml={1} display='flex' width='calc(100% - 48px)'>
            <Box display='flex' flexDirection='column' minWidth={0} flexGrow={1}>
              <Typography component='span' variant='body1' noWrap>
                {contact.name}
              </Typography>
              <Typography component='span' variant='body2' noWrap>
                {messages[0]?.content[0].text}
              </Typography>
            </Box>
            <Box>
              <Typography component='span' variant='caption'>
                {format(new Date(messages[0].updatedAt), 'dd.MM.yyyy')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </ButtonBase>
    );
  },
);
