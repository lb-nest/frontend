import { useMutation } from '@apollo/client';
import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { UPDATE_CONTACT } from '../../../../core/api';
import { Chat, Contact, ContactStatus } from '../../../../core/types';
import { ContactModal } from '../../../contacts';
import { ContactCard } from '../contact-card';
import { SendHsmModal } from '../send-hsm-modal';

interface ChatHeaderProps {
  id?: number;
  contact?: Contact;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ id, contact }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

  const { t } = useTranslation();

  const [updateContact] = useMutation(UPDATE_CONTACT);

  const { showModal } = useModal();

  const handleContactModal = (initData?: Contact) => {
    return () => {
      const modal = showModal(ContactModal, {
        initData,
        onSubmit: () => {
          modal.hide();
        },
        onCancel: () => {
          modal.hide();
        },
      });
    };
  };

  const handleSendHsmModal = (chat: Pick<Chat, 'id' | 'contact'>) => {
    return () => {
      const modal = showModal(SendHsmModal, {
        chat,
        onSubmit: () => {
          modal.hide();
        },
        onCancel: () => {
          modal.hide();
        },
      });
    };
  };

  const handleReturn = (id: number) => {
    return () => {
      toast
        .promise(
          updateContact({
            variables: {
              id,
              assignedTo: null,
              status: ContactStatus.Open,
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
          updateContact({
            variables: {
              id,
              assignedTo: null,
              status: ContactStatus.Closed,
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
      <MenuItem key='sendHsm' onClick={handleSendHsmModal({ id, contact })}>
        {t<string>('chats:chat.list.sendHsm')}
      </MenuItem>,
    );
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
          <MenuItem onClick={handleContactModal(contact)}>
            {t<string>('chats:chat.list.view')}
          </MenuItem>
          {items}
        </Menu>
      </Box>
    </Box>
  );
};
