import { useMutation } from '@apollo/client';
import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CLOSE_CONTACT, RETURN_CONTACT } from '../../../../core/api';
import { Contact } from '../../../../core/types';
import { ContactCard } from '../contact-card';

interface ChatHeaderProps {
  contact?: Contact;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ contact }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

  const { t } = useTranslation();

  const [returnContact] = useMutation(RETURN_CONTACT);
  const [closeContact] = useMutation(CLOSE_CONTACT);

  const handleView = () => {
    return () => {};
  };

  const handleReturn = (id: number) => {
    return () => {
      toast
        .promise(
          returnContact({
            variables: {
              id,
            },
          }),
          t<any, any>('common:promise', { returnObjects: true }),
        )
        .catch(() => null);
    };
  };

  const handleClose = (id: number) => {
    return () => {
      toast
        .promise(
          closeContact({
            variables: {
              id,
            },
          }),
          t<any, any>('common:promise', { returnObjects: true }),
        )
        .catch(() => null);
    };
  };

  if (!contact) {
    return null; // TODO: preloader
  }

  const items: JSX.Element[] = [];

  if (contact.assignedTo != null) {
    items.push(
      <MenuItem key='return' onClick={handleReturn(contact.id)}>
        {t<string>('chats:chat.list.return')}
      </MenuItem>,
    );
    items.push(
      <MenuItem key='close' onClick={handleClose(contact.id)}>
        {t<string>('chats:chat.list.close')}
      </MenuItem>,
    );
  }

  return (
    <Box display='flex' alignItems='center' height={50} padding='0 15px' flexShrink={0}>
      <ContactCard {...contact} />
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
