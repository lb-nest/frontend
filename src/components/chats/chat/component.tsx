import { Box } from '@mui/material';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Contact, Message } from '../../../core/types';
import { ChatHeader } from './header';
import { ChatItem } from './item';
import { TextInput } from './text-input';

interface ChatProps {
  contact: Contact;
  messages?: Message[];
}

export const Chat: React.FC<ChatProps> = ({ contact, messages = [] }) => {
  const id = crypto.randomUUID();

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
          next={() => {
            console.log(1);
          }}
          loader={<div />}
          hasMore
          inverse>
          {messages.map((message) => (
            <ChatItem key={message.id} {...message} />
          ))}
        </InfiniteScroll>
      </Box>
      <TextInput />
    </Box>
  );
};
