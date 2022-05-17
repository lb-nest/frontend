import { MoreVert } from '@mui/icons-material';
import { Box, Icon, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { channel } from 'diagnostics_channel';
import { useModal } from 'mui-modal-provider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as types from '../../../core/types';
import { ChannelModal } from '../modal';
import { ICONS } from './icons';

interface ChannelProps extends types.Channel {}

export const Channel: React.FC<ChannelProps> = ({ id, name, status, type }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();

  const { t } = useTranslation();

  const { showModal } = useModal();

  const icon = ICONS[type];

  const handleOpen: React.MouseEventHandler<HTMLElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleShowModal = () => {
    showModal(ChannelModal, {
      type,
      initData: {
        id,
        name,
        status,
        type,
      },
    });
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
        <Box display='flex' flexGrow={1} overflow='hidden'>
          <Typography noWrap>{name}</Typography>
        </Box>
        <Box display='flex' alignItems='center' flexShrink={0}>
          <Icon
            sx={{
              ml: 2,
              mr: 2,
              color: '#0000008a',
            }}>
            {icon}
          </Icon>
          <IconButton onClick={handleOpen}>
            <MoreVert />
          </IconButton>
          <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem onClick={handleShowModal}>{t<string>('channels:channel.update')}</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Paper>
  );
};
