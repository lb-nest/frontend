import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { Chat, ChatsLayout } from '../../components/chats';
import { CHAT_BY_ID } from '../../core/api';
import { MESSAGES } from '../../core/api/message';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { useAppDispatch } from '../../redux';
import { setChat, setMessages } from '../../redux/features/chat';
import { NextPageWithLayout } from '../_app';

const ChatPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [fetchChat] = useLazyQuery(CHAT_BY_ID, {
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    (async () => {
      const id = Number(router.query.id);
      if (Number.isInteger(id)) {
        const result = await fetchChat({
          variables: {
            id,
          },
        });

        if (result.data) {
          dispatch(setChat(result.data.chatById));
        }
      }
    })();
  }, [router.query.id]);

  const [fetchMessages] = useLazyQuery(MESSAGES, {
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    (async () => {
      const chatId = Number(router.query.id);
      if (Number.isInteger(chatId)) {
        const result = await fetchMessages({
          variables: {
            chatId,
          },
        });

        if (result.data) {
          dispatch(setMessages(result.data.messages));
        }
      }
    })();
  }, [router.query.id]);

  return (
    <GuardWrapper>
      <Chat />
    </GuardWrapper>
  );
};

ChatPage.getLayout = (page) => <ChatsLayout>{page}</ChatsLayout>;

export default ChatPage;
