import { Box } from '@mui/material';
import React from 'react';
import { Layout } from '../../layout';
import { ChatList } from '../chat-list';

interface ChatsLayoutProps {
  children?: React.ReactNode;
}

export const ChatsLayout: React.FC<ChatsLayoutProps> = ({ children }) => {
  return (
    <Layout i18n='common:pages.chats'>
      <Box display='flex' width='100%' height='100%' bgcolor='#f7f7f7'>
        <Box display='flex' flexDirection='column' width='100%' height='100%' maxWidth={360}>
          <ChatList title='Assigned' items={Array.from({ length: 100 }, (_, id) => ({ id }))} />
        </Box>
        <Box display='flex' flexDirection='column' flexGrow={1} borderLeft='1px solid #0002'>
          {children}
        </Box>
      </Box>
    </Layout>
  );
};
