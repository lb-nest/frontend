import { useSubscription } from '@apollo/client';
import React from 'react';
import { CHATS_RECEIVED } from '../core/api';
import { useAppDispatch } from '../redux';
import { handleReceived } from '../redux/features/chat-list';

export const useChatsUpdates = () => {
  const dispatch = useAppDispatch();

  const chats = useSubscription(CHATS_RECEIVED);

  React.useEffect(() => {
    if (chats.data) {
      dispatch(handleReceived(chats.data.chatsReceived));
    }
  }, [chats.data]);
};
