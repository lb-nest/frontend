import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Message } from '../../../../core/types';
import { Attachment } from './attachment';

interface ChatItemProps extends Message {}

export const ChatItem: React.FC<ChatItemProps> = React.memo(
  ({ fromMe, status, content, createdAt, updatedAt }) => {
    const { t } = useTranslation();

    const [{ text, attachments, buttons }] = content;
    const empty = [null, ''].includes(text) && attachments.length === 0 && buttons == null;

    const maxWidth = React.useMemo(() => {
      if (attachments.length) {
        return `${250 * Math.min(attachments.length, 3)}px`;
      }

      return undefined;
    }, [attachments.length]);

    return (
      <Box display='flex' flexDirection='column' alignItems={fromMe ? 'flex-end' : 'flex-start'}>
        <Box display='flex' flexDirection='column' maxWidth='60%' mt='15px'>
          <Box
            bgcolor={fromMe ? '#3d5afe' : '#c4c8d0'}
            color={fromMe ? '#ffffff' : '#000000'}
            borderRadius='10px'
            overflow='hidden'
            sx={
              fromMe
                ? {
                    borderBottomRightRadius: 0,
                  }
                : {
                    borderTopLeftRadius: 0,
                  }
            }>
            <ImageList
              gap={0}
              cols={Math.max(1, Math.min(attachments.length, 3))}
              sx={{
                margin: 0,
              }}>
              {attachments.map((attachment, i) => (
                <ImageListItem key={i}>
                  <Attachment {...attachment} />
                </ImageListItem>
              ))}
            </ImageList>
            {(Boolean(text) || empty) && (
              <Typography
                component='div'
                padding='5px'
                sx={{
                  maxWidth,
                  wordBreak: 'break-all',
                }}>
                {empty ? (
                  <Typography variant='caption'>{t('chats:chat.message.empty')}</Typography>
                ) : (
                  text
                )}
              </Typography>
            )}
          </Box>
          <Box alignSelf={fromMe ? 'flex-end' : 'flex-start'}>
            <Typography component='span' variant='caption'>
              {format(new Date(updatedAt), 'HH:mm')}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  },
);
