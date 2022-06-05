import { useQuery } from '@apollo/client';
import React from 'react';
import { CHATS, CHATS_COUNT, USER } from '../core/api';
import { ContactStatus } from '../core/types';
import { useAppDispatch, useAppSelector } from '../redux';
import { clearChats, selectType, setChats, setChatsCount } from '../redux/features/chat-list';

export const useChats = () => {
  const dispatch = useAppDispatch();

  const type = useAppSelector(selectType);
  React.useEffect(() => {
    dispatch(clearChats());
  }, [type]);

  const user = useQuery(USER);
  const variables = React.useMemo(
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
    [user.data?.user.id],
  );

  useQuery(CHATS, {
    variables: variables[type],
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      dispatch(setChats(data.chats));
    },
  });

  useQuery(CHATS_COUNT, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      dispatch(setChatsCount(data.chatsCount));
    },
  });
};
