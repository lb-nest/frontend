import { useSubscription } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { CHAT_RECEIVED } from '../core/api';
import { useAppDispatch } from '../redux';
import { setChat } from '../redux/features/chat';
import { handleReceived } from '../redux/features/chat-list';

interface ChatsUpdatesProvider {
  children?: React.ReactNode;
}

export const ChatsProvider: React.FC<ChatsUpdatesProvider> = React.memo(({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useSubscription(CHAT_RECEIVED, {
    shouldResubscribe: () => true,
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) {
        return;
      }

      const { chatReceived } = subscriptionData.data;

      dispatch(handleReceived(chatReceived));
      if (router.query.id?.toString() === `${chatReceived.channelId}:${chatReceived.accountId}`) {
        dispatch(setChat(chatReceived));
      }

      if (
        !subscriptionData.data.chatReceived.messages[0]?.fromMe &&
        !window.document.hasFocus() &&
        Notification.permission === 'granted'
      ) {
        const notification = new Notification(subscriptionData.data.chatReceived.contact.name, {
          body: subscriptionData.data.chatReceived.messages[0].content[0].text,
          icon: '/favicon.png',
          renotify: true,
          tag: subscriptionData.data.chatReceived.contact.id.toString(),
        });

        notification.onclick = () => {
          window.focus();
        };
      }
    },
  });

  return <>{children}</>;
});
