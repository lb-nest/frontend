import { useLazyQuery, useSubscription } from '@apollo/client';
import React from 'react';
import { CHATS_COUNT, CHATS_RECEIVED } from '../core/api';
import { useAppDispatch } from '../redux';
import * as chatList from '../redux/features/chat-list';
import * as chat from '../redux/features/chat';

export const useChatsUpdates = () => {
  const dispatch = useAppDispatch();

  const [fetchChatsCount] = useLazyQuery(CHATS_COUNT, {
    fetchPolicy: 'no-cache',
  });

  const chats = useSubscription(CHATS_RECEIVED);

  React.useEffect(() => {
    if (chats.data) {
      dispatch(chatList.handleReceived(chats.data.chatsReceived));
      dispatch(chat.handleReceived(chats.data.chatsReceived));

      fetchChatsCount()
        .then((chatsCount) => {
          if (chatsCount.data) {
            dispatch(chatList.setCount(chatsCount.data.chatsCount));
          }
        })
        .catch(() => null);
    }
  }, [chats.data]);
};
