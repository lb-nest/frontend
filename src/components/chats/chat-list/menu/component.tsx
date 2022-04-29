import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { selectChatsCount, setType } from '../../../../redux/features/chat-list';
import { ChatListMenuItem } from './item';

export const ChatListMenu: React.FC = () => {
  const { t } = useTranslation();

  const chatsCount = useAppSelector(selectChatsCount);
  const dispatch = useAppDispatch();

  return (
    <Box padding='50px 15px' flexShrink={0}>
      <Typography fontWeight={700}>{t<string>('chats:open')}</Typography>
      <Box padding='10px'>
        <ChatListMenuItem
          name={t<string>('chats:assigned')}
          count={chatsCount.assigned}
          onClick={() => {
            dispatch(setType(0));
          }}
        />
        <ChatListMenuItem
          name={t<string>('chats:unassigned')}
          count={chatsCount.unassigned}
          onClick={() => {
            dispatch(setType(1));
          }}
        />
      </Box>
      <Typography
        fontWeight={700}
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          dispatch(setType(2));
        }}>
        {t<string>('chats:closed')}
      </Typography>
    </Box>
  );
};
