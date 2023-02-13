import { Box, Avatar, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Contact } from '../../../../core/types';

interface ContactCardProps extends Contact {}

export const ContactCard: React.FC<ContactCardProps> = React.memo(
  ({ name, avatarUrl, assignedTo }) => {
    const { t } = useTranslation();

    return (
      <Box display='flex' alignItems='center' flexGrow={1} flexShrink={1} overflow='hidden'>
        <Avatar src={avatarUrl} alt={name} />
        <Box ml={1}>
          <Typography component='div' variant='body1' noWrap>
            {name}
          </Typography>
          <Typography
            component='div'
            variant='body2'
            sx={{
              display: 'flex',
            }}
            noWrap>
            <Typography
              component='div'
              variant='inherit'
              sx={{
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
