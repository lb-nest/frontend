import { useQuery, useSubscription } from '@apollo/client';
import React from 'react';
import { CHATS_COUNT, CHATS_RECEIVED } from '../core/api';
import { useAppDispatch } from '../redux';
import * as chat from '../redux/features/chat';
import * as chatList from '../redux/features/chat-list';

interface ChatsUpdatesProvider {
  children?: React.ReactNode;
}

export const ChatsUpdatesProvider: React.FC<ChatsUpdatesProvider> = ({ children }) => {
  const dispatch = useAppDispatch();

  const chatsCount = useQuery(CHATS_COUNT);
  React.useEffect(() => {
    if (chatsCount.data) {
      dispatch(chatList.setChatsCount(chatsCount.data.chatsCount));
    }
  }, [chatsCount.data]);

  const chats = useSubscription(CHATS_RECEIVED, {
    shouldResubscribe: () => true,
  });

  React.useEffect(() => {
    if (chats.data) {
      dispatch(chatList.handleReceived(chats.data.chatsReceived));
      dispatch(chat.handleReceived(chats.data.chatsReceived));

      chatsCount.refetch();
    }
  }, [chats.data]);

  return <>{children}</>;
};
