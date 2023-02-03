import { useQuery } from '@apollo/client';
import React from 'react';
import { GuardContext } from '../components/guard-context';
import { CHATS, CHATS_COUNT, USER } from '../core/api';
import { AssigneeType, ContactStatus } from '../core/types';
import { useAppDispatch, useAppSelector } from '../redux';
import { clearChats, selectType, setChats, setChatsCount } from '../redux/features/chat-list';

export const useChats = () => {
  const guard = React.useContext(GuardContext);

  const dispatch = useAppDispatch();

  const type = useAppSelector(selectType);
  React.useEffect(() => {
    dispatch(clearChats());
  }, [type]);

  const variables = React.useMemo(
    () => [
      {
        assignedTo: {
          id: guard.payload?.id,
          type: AssigneeType.User,
        },
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
    [guard.payload?.id],
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
