import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Contact } from '../../../../core/types';

interface ChatHeaderProps {
  contact: Contact;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ contact }) => {
  const { t } = useTranslation();

  return (
    <Box display='flex' alignItems='center' height={50} padding='0 15px' flexShrink={0}>
      <Box display='flex' alignItems='center'>
        <Avatar src={contact.avatarUrl} alt={contact.name} />
        <Box ml='10px'>
          <Typography component='div' variant='body1'>
            <Typography component='span' variant='inherit'>
              {contact.name}
            </Typography>
          </Typography>
          <Typography component='div' variant='body2'>
            <Typography component='span' variant='inherit'>
              {contact.username}
            </Typography>
            <Typography
              component='span'
              variant='inherit'
              sx={{
                ml: 1,
              }}>
              {t('chats:chat.header.assignedTo')}:
            </Typography>
            <Typography
              component='span'
              variant='inherit'
              sx={{
                ml: 1,
              }}>
              {contact.assignedTo?.name ?? '-'}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
