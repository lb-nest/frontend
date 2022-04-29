import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChatListMenuItem } from './item';

export const ChatListMenu: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box padding='50px 15px' flexShrink={0}>
      <Typography fontWeight={700}>{t<string>('chats:open')}</Typography>
      <Box padding='10px'>
        <ChatListMenuItem name={t<string>('chats:assigned')} count={31} />
        <ChatListMenuItem name={t<string>('chats:unassigned')} count={99} />
      </Box>
      <Typography fontWeight={700}>{t<string>('chats:closed')}</Typography>
    </Box>
  );
};
