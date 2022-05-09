import { MoreVert } from '@mui/icons-material';
import { Box, Icon, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import * as types from '../../../core/types';
import { ICONS } from './icons';

interface ChannelProps extends types.Channel {}

export const Channel: React.FC<ChannelProps> = ({ id, name, status, type }) => {
  const icon = ICONS[type];

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
          <IconButton>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
