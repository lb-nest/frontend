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
            margin='5px'
            padding='10px'
            color='inherit'
            borderRadius='10px'
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
                mr: '5px',
                bgcolor: '#f7f7f7',
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
          <Zoom overlayBgColorStart='#0000' overlayBgColorEnd='#000c'>
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
        <Box display='flex' alignItems='center' padding='5px' color='#f44336'>
          <ErrorOutline />
          <Typography
            sx={{
              ml: '5px',
            }}>
            {t('chats:chat.message.unsupportedMediaType')}
          </Typography>
        </Box>
      );
  }
});
