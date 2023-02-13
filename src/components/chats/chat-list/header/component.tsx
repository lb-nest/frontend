import { FilterListOutlined, MenuOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ChatListSearch } from '../search';

interface ChatListHeaderProps {
  title?: string;
  onSearch?: (query: string) => void;
  onExpand?: () => void;
}

export const ChatListHeader: React.FC<ChatListHeaderProps> = ({ title, onSearch, onExpand }) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' p={1} flexShrink={0}>
      <IconButton onClick={onExpand}>
        <MenuOutlined />
      </IconButton>
      <Box display='flex' alignItems='center' position='relative' flexGrow={1}>
        <Typography>{title}</Typography>
        <ChatListSearch onChange={onSearch} />
      </Box>
      <IconButton>
        <FilterListOutlined />
      </IconButton>
    </Box>
  );
};
