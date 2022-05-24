import { Box } from '@mui/material';
import React from 'react';
import { useChats } from '../../../hooks/use-chats';
import { Layout } from '../../layout';
import { ChatList } from '../chat-list';

interface ChatsLayoutProps {
  children?: React.ReactNode;
}

export const ChatsLayout: React.FC<ChatsLayoutProps> = ({ children }) => {
  useChats();

  return (
    <Layout i18n='common:pages.chats'>
      <Box display='flex' width='100%' height='100%' bgcolor='#f0f1f3'>
        <Box
          display='flex'
          flexDirection='column'
          flexShrink={0}
          width='100%'
          height='100%'
          maxWidth={360}>
          <ChatList />
        </Box>
        <Box display='flex' flexDirection='column' flexGrow={1} borderLeft='1px solid #0000003b'>
          {children}
        </Box>
      </Box>
    </Layout>
  );
};
