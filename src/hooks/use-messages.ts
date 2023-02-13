import { useQuery, useSubscription } from '@apollo/client';
import { MESSAGES, MESSAGE_RECEIVED } from '../core/api';
import { useAppDispatch } from '../redux';
import { handleReceived, setMessages } from '../redux/features/chat';

export const useMessages = (id?: string[]) => {
  const dispatch = useAppDispatch();

  const skip = typeof id === 'undefined';

  useQuery(MESSAGES, {
    variables: {
      channelId: Number(id?.[0]),
      accountId: id?.[1],
    },
    skip,
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      dispatch(setMessages(data.messages));
    },
  });

  useSubscription(MESSAGE_RECEIVED, {
    variables: {
      channelId: Number(id?.[0]),
      accountId: id?.[1],
    },
    skip,
    onData: ({ data }) => {
      if (data.data) {
        dispatch(handleReceived(data.data.messageReceived));
      }
    },
    shouldResubscribe: () => true,
  });
};
