import { Box, Avatar, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Contact } from '../../../../core/types';

interface ContactCardProps extends Contact {}

export const ContactCard: React.FC<ContactCardProps> = React.memo(
  ({ username, name, avatarUrl, assignedTo }) => {
    const { t } = useTranslation();

    return (
      <Box display='flex' alignItems='center' flexGrow={1}>
        <Avatar src={avatarUrl} alt={name} />
        <Box ml='10px'>
          <Typography component='div' variant='body1'>
            <Typography component='span' variant='inherit'>
              {name}
            </Typography>
          </Typography>
          <Typography
            component='div'
            variant='body2'
            sx={{
              display: 'flex',
            }}>
            <Typography component='div' variant='inherit'>
              {username}
            </Typography>
            <Typography
              component='div'
              variant='inherit'
              sx={{
                ml: 1,
                mr: 1,
              }}>
              {t('chats:chat.header.assignedTo')}:
            </Typography>
            <Typography component='div' variant='inherit'>
              {assignedTo?.name ?? '-'}
            </Typography>
          </Typography>
        </Box>
      </Box>
    );
  },
);
