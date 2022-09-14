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

      if (
        !subscriptionData.data.chatsReceived.messages[0].fromMe &&
        !window.document.hasFocus() &&
        Notification.permission === 'granted'
      ) {
        const notification = new Notification(subscriptionData.data.chatsReceived.contact.name, {
          body: subscriptionData.data.chatsReceived.messages[0].content[0].text,
          icon: '/favicon.png',
          renotify: true,
          tag: subscriptionData.data.chatsReceived.id.toString(),
        });

        notification.onclick = () => {
          window.focus();
        };
      }
    },
  });

  return <>{children}</>;
});
