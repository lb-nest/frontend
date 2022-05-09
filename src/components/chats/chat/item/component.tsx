import { Box, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import * as locales from 'date-fns/locale';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Message } from '../../../../core/types';

interface ChatItemProps extends Message {}

export const ChatItem: React.FC<ChatItemProps> = ({
  fromMe,
  status,
  content,
  createdAt,
  updatedAt,
}) => {
  const { t, i18n } = useTranslation();

  const [{ text, attachments, buttons }] = content;
  const empty = [null, ''].includes(text) && attachments.length === 0 && buttons == null;

  return (
    <Box display='flex' flexDirection='column' alignItems={fromMe ? 'flex-end' : 'flex-start'}>
      <Box maxWidth='80%' mt='15px'>
        <Box
          padding='5px'
          color={fromMe ? '#fff' : '#000'}
          bgcolor={fromMe ? '#4356ff' : '#cacaca'}
          borderRadius='10px'
          sx={
            fromMe
              ? {
                  borderBottomRightRadius: 0,
                }
              : {
                  borderTopLeftRadius: 0,
                }
          }>
          <Typography component='span'>{empty ? t('chats:chat.message.empty') : text}</Typography>
        </Box>
        <Typography component='span' variant='body2'>
          {formatDistanceToNow(new Date(updatedAt), {
            addSuffix: true,
            locale: locales[i18n.language],
          })}
        </Typography>
      </Box>
    </Box>
  );
};
