import { useQuery, useSubscription } from '@apollo/client';
import { MESSAGES, MESSAGES_RECEIVED } from '../core/api';
import { useAppDispatch } from '../redux';
import { handleReceived, setMessages } from '../redux/features/chat';

export const useMessages = (chatId: number) => {
  const dispatch = useAppDispatch();

  useQuery(MESSAGES, {
    variables: {
      chatId,
    },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      dispatch(setMessages(data.messages));
    },
  });

  useSubscription(MESSAGES_RECEIVED, {
    variables: {
      chatId,
    },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        dispatch(handleReceived(subscriptionData.data.messagesReceived));
      }
    },
    shouldResubscribe: () => true,
  });
};
