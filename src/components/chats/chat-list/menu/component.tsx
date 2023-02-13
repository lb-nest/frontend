import {
  AssignmentIndOutlined,
  AssignmentLateOutlined,
  AssignmentTurnedInOutlined,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { selectType, setType } from '../../../../redux/features/chat-list';

export const ChatListMenu: React.FC = () => {
  const { t } = useTranslation();

  const type = useAppSelector(selectType);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent<Element, Event>, value: any) => {
    dispatch(setType(value));
  };

  return (
    <BottomNavigation
      showLabels
      value={type}
      onChange={handleChange}
      sx={{
        bgcolor: 'transparent',
      }}>
      <BottomNavigationAction
        value='assigned'
        icon={<AssignmentIndOutlined />}
        label={t<string>('chats:assigned')}
      />
      <BottomNavigationAction
        value='unassigned'
        label={t<string>('chats:unassigned')}
        icon={<AssignmentLateOutlined />}
      />
      <BottomNavigationAction
        value='closed'
        label={t<string>('chats:closed')}
        icon={<AssignmentTurnedInOutlined />}
      />
    </BottomNavigation>
  );
};
