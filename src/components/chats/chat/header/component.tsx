import { useMutation } from '@apollo/client';
import { MoreVert } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CLOSE_CONTACT, RETURN_CONTACT } from '../../../../core/api';
import { Contact } from '../../../../core/types';

interface ChatHeaderProps {
  contact: Contact;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ contact }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

  const { t } = useTranslation();

  const [returnContact] = useMutation(RETURN_CONTACT);
  const [closeContact] = useMutation(CLOSE_CONTACT);

  const handleView = () => {};

  const handleReturn = () => {
    toast
      .promise(
        returnContact({
          variables: {
            id: contact.id,
          },
        }),
        t<any, any>('common:promise'),
      )
      .catch(() => null);
  };

  const handleClose = () => {
    toast
      .promise(
        closeContact({
          variables: {
            id: contact.id,
          },
        }),
        t<any, any>('common:promise'),
      )
      .catch(() => null);
  };

  const items: JSX.Element[] = [];

  if (contact.assignedTo != null) {
    items.push(
      <MenuItem key='return' onClick={handleReturn}>
        {t<string>('chats:chat.list.return')}
      </MenuItem>,
    );
    items.push(
      <MenuItem key='close' onClick={handleClose}>
        {t<string>('chats:chat.list.close')}
      </MenuItem>,
    );
  }

  return (
    <Box display='flex' alignItems='center' height={50} padding='0 15px' flexShrink={0}>
      <Box display='flex' alignItems='center' flexGrow={1}>
        <Avatar src={contact.avatarUrl} alt={contact.name} />
        <Box ml='10px'>
          <Typography component='div' variant='body1'>
            <Typography component='span' variant='inherit'>
              {contact.name}
            </Typography>
          </Typography>
          <Typography
            component='div'
            variant='body2'
            sx={{
              display: 'flex',
            }}>
            <Typography component='div' variant='inherit'>
              {contact.username}
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
              {contact.assignedTo?.name ?? '-'}
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Box display='flex' alignItems='center' flexShrink={0}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(undefined)}>
          <MenuItem onClick={handleView}>{t<string>('chats:chat.list.view')}</MenuItem>
          {items}
        </Menu>
      </Box>
    </Box>
  );
};
