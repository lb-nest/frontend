import { useMutation } from '@apollo/client';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ACCEPT_CONTACT, REOPEN_CONTACT } from '../../../../core/api';
import { Contact, ContactStatus } from '../../../../core/types';

interface ChatOverlayProps {
  contact?: Contact;
}

export const ChatOverlay: React.FC<ChatOverlayProps> = ({ contact }) => {
  const { t } = useTranslation();

  const [accectContact] = useMutation(ACCEPT_CONTACT);
  const [reopenContact] = useMutation(REOPEN_CONTACT);

  const handleAccept = (id: number) => {
    return () => {
      toast
        .promise(
          accectContact({
            variables: {
              id,
            },
          }),
          t<any, any>('common:promise', { returnObjects: true }),
        )
        .catch(() => null);
    };
  };

  const handleReopen = (id: number) => {
    return () => {
      toast
        .promise(
          reopenContact({
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

  if (contact.assignedTo != null) {
    return null;
  }

  const closed = contact.status === ContactStatus.Closed;

  return (
    <Box
      width='100%'
      height='100%'
      position='absolute'
      left={0}
      top={0}
      bgcolor='#f7f7f7'
      zIndex={1}>
      <Button
        sx={{
          width: '100%',
          height: '100%',
        }}
        onClick={closed ? handleReopen(contact.id) : handleAccept(contact.id)}>
        {t<string>(`chats:chat.list.${closed ? 'reopen' : 'accept'}`)}
      </Button>
    </Box>
  );
};
