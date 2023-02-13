import { useQuery } from '@apollo/client';
import React from 'react';
import { GuardContext } from '../components/guard-context';
import { CHATS } from '../core/api';
import { AssigneeType, ContactStatus } from '../core/types';
import { useAppDispatch, useAppSelector } from '../redux';
import { ChatsState, clearChats, selectType, setChats } from '../redux/features/chat-list';

const factory = (id?: number) => {
  return (): Record<ChatsState['type'], any> => ({
    assigned: {
      assignedTo: {
        id,
        type: AssigneeType.User,
      },
      status: ContactStatus.Open,
    },
    unassigned: {
      assignedTo: null,
      status: ContactStatus.Open,
    },
    closed: {
      assignedTo: null,
      status: ContactStatus.Closed,
    },
  });
};

export const useChats = () => {
  const guard = React.useContext(GuardContext);

  const dispatch = useAppDispatch();

  const type = useAppSelector(selectType);

  React.useEffect(() => {
    dispatch(clearChats());
  }, [type]);

  const variables = React.useMemo<Record<ChatsState['type'], any>>(factory(guard.payload?.id), [
    guard.payload?.id,
  ]);

  useQuery(CHATS, {
    variables: variables[type],
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      dispatch(setChats(data.chats));
    },
  });
};
