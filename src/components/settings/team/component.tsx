import { LogoutOutlined } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { User } from '../../../core/types';

interface TeamProps {
  users: User[];
}

export const Team: React.FC<TeamProps> = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <Box
          key={user.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
            p: 1,
          }}>
          <Avatar src={user.avatarUrl} />
          <Box ml='15px' overflow='hidden' flexGrow={1}>
            <Typography variant='body1' noWrap>
              {user.name}
            </Typography>
            <Typography variant='body2' noWrap>
              {user.email}
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <LogoutOutlined />
            </IconButton>
          </Box>
        </Box>
      ))}
    </>
  );
};
