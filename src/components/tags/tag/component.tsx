import { DeleteOutlined, EditOutlined, TagOutlined } from '@mui/icons-material';
import { Avatar, Box, Chip, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import * as types from '../../../core/types';

interface TagProps extends types.Tag {
  onUpdate?: () => void;
  onDelete?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  name,
  description,
  color,
  children,
  onUpdate,
  onDelete,
}) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 1,
        padding: 2,
        overflow: 'hidden',
        ':last-child': {
          mb: 0,
        },
      }}>
      <Avatar
        variant='rounded'
        sx={{
          width: 30,
          height: 30,
          bgcolor: color,
        }}>
        <TagOutlined />
      </Avatar>
      <Box flexGrow={1} ml={2} overflow='hidden'>
        <Typography component='div' variant='body1' noWrap>
          {name}
        </Typography>
        <Typography component='div' variant='body2' noWrap>
          {description}
        </Typography>
        <Box display='flex' flexWrap='nowrap'>
          {children.map((children) => (
            <Chip
              key={children.id}
              size='small'
              variant='outlined'
              avatar={
                <Avatar
                  sx={{
                    bgcolor: children.color,
                  }}>
                  <TagOutlined
                    sx={{
                      width: 20,
                      height: 20,
                      color: '#ffffff',
                    }}
                  />
                </Avatar>
              }
              label={children.name}
            />
          ))}
        </Box>
      </Box>
      <Box flexShrink={0}>
        <IconButton onClick={onUpdate}>
          <EditOutlined />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteOutlined />
        </IconButton>
      </Box>
    </Paper>
  );
};
