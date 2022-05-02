import { useLazyQuery, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { ChatsLayout } from '../../components/chats';
import { Chat } from '../../components/chats/chat';
import { CHAT_BY_ID } from '../../core/api';
import { MESSAGES } from '../../core/api/message';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ChatPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const router = useRouter();

  const chat = useQuery(CHAT_BY_ID, {
    variables: {
      id: Number(router.query.id),
    },
  });

  const [fetchMessages, messages] = useLazyQuery(MESSAGES, {
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    if (chat.data) {
      fetchMessages({
        variables: {
          chatId: chat.data.chatById.id,
        },
      });
    }
  }, [chat.data]);

  const contact = chat.data?.chatById.contact;

  return (
    <GuardWrapper>
      {contact && <Chat contact={contact} messages={messages.data?.messages} />}
    </GuardWrapper>
  );
};

ChatPage.getLayout = (page) => <ChatsLayout>{page}</ChatsLayout>;

export default ChatPage;
