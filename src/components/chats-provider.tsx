import { useQuery, useSubscription } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { CHATS_COUNT, CHATS_RECEIVED } from '../core/api';
import { useAppDispatch } from '../redux';
import { setIdAndContact } from '../redux/features/chat';
import { handleReceived, setChatsCount } from '../redux/features/chat-list';

interface ChatsUpdatesProvider {
  children?: React.ReactNode;
}

export const ChatsProvider: React.FC<ChatsUpdatesProvider> = React.memo(({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { refetch } = useQuery(CHATS_COUNT, {
    onCompleted: (data) => {
      dispatch(setChatsCount(data.chatsCount));
    },
  });

  useSubscription(CHATS_RECEIVED, {
    shouldResubscribe: () => true,
    onSubscriptionData: ({ subscriptionData }) => {
      dispatch(handleReceived(subscriptionData.data.chatsReceived));
      if (Number(router.query.id) === subscriptionData.data.chatsReceived.id) {
        dispatch(setIdAndContact(subscriptionData.data.chatsReceived));
      }
      refetch();
    },
  });

  return <>{children}</>;
});
