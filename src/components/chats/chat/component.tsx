import { useMutation } from '@apollo/client';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { ACCEPT_CONTACT, REOPEN_CONTACT } from '../../../core/api';
import { Contact, ContactStatus, Message } from '../../../core/types';
import { ChatHeader } from './header';
import { ChatItem } from './item';
import { TextInput } from './text-input';

interface ChatProps {
  contact: Contact;
  messages?: Message[];
}

export const Chat: React.FC<ChatProps> = ({ contact, messages = [] }) => {
  const { t } = useTranslation();

  const id = crypto.randomUUID();

  const [accectContact] = useMutation(ACCEPT_CONTACT);
  const [reopenContact] = useMutation(REOPEN_CONTACT);

  const handleAccept = () => {
    toast
      .promise(
        accectContact({
          variables: {
            id: contact.id,
          },
        }),
        t<any, any>('common:promise'),
      )
      .catch(() => null);
  };

  const handleReopen = () => {
    toast
      .promise(
        reopenContact({
          variables: {
            id: contact.id,
          },
        }),
        t<any, any>('common:promise'),
      )
      .catch(() => null);
  };

  const closed = contact.status === ContactStatus.Closed;

  return (
    <Box display='flex' flexDirection='column' height='100%'>
      <ChatHeader contact={contact} />
      <Box
        id={id}
        display='flex'
        flexDirection='column-reverse'
        padding='15px'
        flexGrow={1}
        overflow='auto'>
        <InfiniteScroll
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
          scrollableTarget={id}
          dataLength={messages.length}
          next={() => {}}
          loader={<div />}
          hasMore
          inverse>
          {messages.map((message) => (
            <ChatItem key={message.id} {...message} />
          ))}
        </InfiniteScroll>
      </Box>
      <Box position='relative'>
        <TextInput />
        {contact.assignedTo == null && (
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
              onClick={closed ? handleReopen : handleAccept}>
              {t<string>('chats:chat.list.'.concat(closed ? 'reopen' : 'accept'))}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
