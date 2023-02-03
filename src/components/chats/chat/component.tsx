import { Box, Typography } from '@mui/material';
import { format, isSameDay, isToday, isYesterday } from 'date-fns';
import { nanoid } from 'nanoid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppSelector } from '../../../redux';
import { selectChat } from '../../../redux/features/chat';
import { ChatHeader } from './header';
import { ChatInput } from './input';
import { ChatItem } from './item';
import { ChatOverlay } from './overlay';

export const Chat: React.FC = () => {
  const { t } = useTranslation();

  const { messages, ...chat } = useAppSelector(selectChat);

  const id = React.useMemo(() => nanoid(), []);

  return (
    <Box display='flex' flexDirection='column' height='100%'>
      <ChatHeader {...chat} />
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
          {messages.map((message, index, array) => (
            <React.Fragment key={message.id}>
              <ChatItem {...message} />
              {isSameDay(
                new Date(message.createdAt),
                new Date(array[index + 1]?.createdAt),
              ) ? null : (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='caption' fontWeight={700} color='#6e778a'>
                    {isToday(new Date(message.createdAt))
                      ? t<string>('chats:chat.system.today')
                      : isYesterday(new Date(message.createdAt))
                      ? t<string>('chats:chat.system.yesterday')
                      : format(new Date(message.createdAt), 'dd.MM.yyyy')}
                  </Typography>
                </Box>
              )}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      </Box>
      <Box position='relative'>
        <ChatInput />
        <ChatOverlay contact={chat.contact} />
      </Box>
    </Box>
  );
};
