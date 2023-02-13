import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../redux';
import { selectChats } from '../../../redux/features/chat-list';
import { ChatListItem } from './item';
import { ChatListMenu } from './menu';

interface ChatListProps {}

export const ChatList: React.FC<ChatListProps> = () => {
  const { t } = useTranslation();

  const chats = useAppSelector(selectChats);

  return (
    <Box display='flex' flexDirection='column' flexGrow={1} overflow='hidden'>
      <ChatListMenu />
      <Box flexGrow={1} overflow='auto'>
        {chats.length === 0 ? (
          <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
            <Typography color='#6e778a'>{t<string>('chats:noData')}</Typography>
          </Box>
        ) : (
          chats.map((item) => (
            <ChatListItem key={`${item.channelId}:${item.accountId}`} {...item} />
          ))
        )}
      </Box>
    </Box>
  );
};
