import { Box } from '@mui/material';
import React from 'react';
import { ChatsLayout } from '../../components/chats';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ChatPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return <GuardWrapper>chat</GuardWrapper>;
};

ChatPage.getLayout = (page) => <ChatsLayout>{page}</ChatsLayout>;

export default ChatPage;
