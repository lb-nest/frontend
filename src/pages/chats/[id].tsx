import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { Chat, ChatsLayout } from '../../components/chats';
import { CHAT } from '../../core/api';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { useMessages } from '../../hooks/use-messages';
import { useAppDispatch } from '../../redux';
import { setChat } from '../../redux/features/chat';
import { NextPageWithLayout } from '../_app';

const ChatPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const id = router.query.id?.toString().split(':');

  const chat = useQuery(CHAT, {
    variables: {
      channelId: Number(id?.[0]),
      accountId: id?.[1],
    },
    fetchPolicy: 'no-cache',
    skip: typeof id == 'undefined',
  });

  React.useEffect(() => {
    if (chat.data) {
      dispatch(setChat(chat.data.chat));
    }
  }, [chat]);

  useMessages(id);

  return (
    <GuardWrapper>
      <Chat />
    </GuardWrapper>
  );
};

ChatPage.getLayout = (page) => <ChatsLayout>{page}</ChatsLayout>;

export default ChatPage;
