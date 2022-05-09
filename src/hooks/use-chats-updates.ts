import { useLazyQuery, useSubscription } from '@apollo/client';
import React from 'react';
import { CHATS_COUNT, CHATS_RECEIVED } from '../core/api';
import { useAppDispatch } from '../redux';
import { handleReceived, setCount } from '../redux/features/chat-list';

export const useChatsUpdates = () => {
  const dispatch = useAppDispatch();

  const [getChatsCount] = useLazyQuery(CHATS_COUNT, {
    fetchPolicy: 'no-cache',
  });

  const chats = useSubscription(CHATS_RECEIVED);

  React.useEffect(() => {
    if (chats.data) {
      dispatch(handleReceived(chats.data.chatsReceived));
      getChatsCount()
        .then((chatsCount) => {
          if (chatsCount.data) {
            dispatch(setCount(chatsCount.data.chatsCount));
          }
        })
        .catch(() => null);
    }
  }, [chats.data]);
};
