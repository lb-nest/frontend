import { useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { CHATS, CHATS_COUNT, USER } from '../core/api';
import { ContactStatus } from '../core/types';
import { useAppDispatch, useAppSelector } from '../redux';
import { clearItems, pushItems, selectType, setCount } from '../redux/features/chat-list';

export const useChats = () => {
  const dispatch = useAppDispatch();

  const user = useQuery(USER);

  const type = useAppSelector(selectType);
  React.useEffect(() => {
    dispatch(clearItems());
  }, [type]);

  const chatsCount = useQuery(CHATS_COUNT, {
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    if (chatsCount.data) {
      dispatch(setCount(chatsCount.data.chatsCount));
    }
  }, [chatsCount.data]);

  const queries = React.useMemo(
    () => [
      {
        assignedTo: user.data?.user.id,
        status: ContactStatus.Open,
      },
      {
        assignedTo: null,
        status: ContactStatus.Open,
      },
      {
        assignedTo: null,
        status: ContactStatus.Closed,
      },
    ],
    [user.data],
  );

  const [fetchChats] = useLazyQuery(CHATS, {
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    (async () => {
      const chats = await fetchChats({
        variables: queries[type],
      });

      if (chats.data) {
        dispatch(pushItems(chats.data.chats));
      }
    })();
  }, [fetchChats, type, queries]);
};
