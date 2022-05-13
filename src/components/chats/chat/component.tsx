import { Box } from '@mui/material';
import { nanoid } from 'nanoid';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppSelector } from '../../../redux';
import { selectChat } from '../../../redux/features/chat';
import { ChatHeader } from './header';
import { ChatInput } from './input';
import { ChatItem } from './item';
import { ChatOverlay } from './overlay';

export const Chat: React.FC = () => {
  const { contact, messages } = useAppSelector(selectChat);

  const id = React.useMemo(() => nanoid(), []);

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
        <ChatInput />
        <ChatOverlay contact={contact} />
      </Box>
    </Box>
  );
};
