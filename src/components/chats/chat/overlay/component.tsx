import { useMutation } from '@apollo/client';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { UPDATE_CONTACT } from '../../../../core/api';
import { AssigneeType, Contact, ContactStatus } from '../../../../core/types';
import { GuardContext } from '../../../guard-context';

interface ChatOverlayProps {
  contact?: Contact;
}

export const ChatOverlay: React.FC<ChatOverlayProps> = ({ contact }) => {
  const guard = React.useContext(GuardContext);

  const { t } = useTranslation();

  const [updateContact] = useMutation(UPDATE_CONTACT);

  const handleAccept = (id: number) => {
    return () => {
      toast
        .promise(
          updateContact({
            variables: {
              id,
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
  };

  if (!contact) {
    return null; // TODO: preloader
  }

  if (contact.assignedTo != null) {
    return null;
  }

  return (
    <Box
      width='100%'
      height='100%'
      position='absolute'
      left={0}
      top={0}
      bgcolor='#f0f1f3'
      zIndex={1}>
      <Button
        sx={{
          width: '100%',
          height: '100%',
        }}
        onClick={handleAccept(contact.id)}>
        {t<string>('chats:chat.list.accept')}
      </Button>
    </Box>
  );
};
