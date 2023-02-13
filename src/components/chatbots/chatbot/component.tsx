import { useMutation } from '@apollo/client';
import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Paper, Switch, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { UPDATE_CHATBOT } from '../../../core/api';
import * as types from '../../../core/types';
import { locale } from '../../../i18n';

interface ChatbotProps extends types.Chatbot {
  onDelete?: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ id, name, updatedAt, enabled, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();

  const { t, i18n } = useTranslation();

  const [updateChatbot] = useMutation(UPDATE_CHATBOT);

  const handleOpen: React.MouseEventHandler<HTMLElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleEnabledChange = async () => {
    try {
      await toast.promise(
        updateChatbot({
          variables: {
            id,
            enabled: !enabled,
          },
        }),
        t<any, any>('common:promise', { returnObjects: true }),
      );
    } catch {}
  };

  return (
    <Paper
      sx={{
        mb: 1,
        ':last-child': {
          mb: 0,
        },
      }}>
      <Box display='flex' alignItems='center' padding={2}>
        <Box display='flex' flexDirection='column' flexGrow={1} overflow='hidden'>
          <Typography noWrap variant='body1'>
            {name}
          </Typography>
          <Typography noWrap variant='body2'>
            {formatDistance(new Date(updatedAt), new Date(), {
              addSuffix: true,
              locale: locale[i18n.language],
            })}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' flexShrink={0}>
          <Switch checked={enabled} onClick={handleEnabledChange} />
          <IconButton onClick={handleOpen}>
            <MoreVert />
          </IconButton>
          <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
            <li tabIndex={-1}>
              <MenuItem href={`/chatbots/${id}/editor`} component={Link}>
                {t<string>('chatbots:chatbot.update')}
              </MenuItem>
            </li>
            <MenuItem onClick={onDelete}>{t<string>('chatbots:chatbot.delete')}</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Paper>
  );
};
