import { ErrorOutline, FileUploadOutlined } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Zoom from 'react-medium-image-zoom';
import * as types from '../../../../../core/types';

interface AttachmentProps extends types.Attachment {}

export const Attachment: React.FC<AttachmentProps> = React.memo(({ type, url, name }) => {
  const { t } = useTranslation();

  switch (type) {
    case types.AttachmentType.Audio:
    case types.AttachmentType.Document:
    case types.AttachmentType.Video:
      return (
        <Tooltip title={t('chats:chat.message.download')} placement='right'>
          <Box
            component='a'
            display='flex'
            alignItems='center'
            width='min-content'
            margin={0.5}
            padding={1}
            color='inherit'
            sx={{
              textDecoration: 'none',
            }}
            href={url}
            download={name}
            target='_blank'
            rel='norefferer'>
            <IconButton
              disableRipple
              sx={{
                mr: 1,
                bgcolor: '#f0f1f3',
              }}>
              <FileUploadOutlined />
            </IconButton>
            <Box>
              <Typography variant='body1'>
                {name ?? t('chats:chat.message.defaultFileName')}
              </Typography>
              <Typography variant='caption'>{type}</Typography>
            </Box>
          </Box>
        </Tooltip>
      );

    case types.AttachmentType.Image:
      return (
        <Box display='flex' maxWidth={250} width='100%' flexShrink={0}>
          <Zoom overlayBgColorStart='#00000000' overlayBgColorEnd='#000000b3'>
            <Box
              component='img'
              display='block'
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              src={url}
            />
          </Zoom>
        </Box>
      );

    default:
      return (
        <Box display='flex' alignItems='center' padding={0.5} color='#f44336'>
          <ErrorOutline />
          <Typography
            sx={{
              ml: 0.5,
            }}>
            {t('chats:chat.message.unsupportedMediaType')}
          </Typography>
        </Box>
      );
  }
});
