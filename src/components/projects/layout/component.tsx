import { useQuery } from '@apollo/client';
import { LogoutOutlined } from '@mui/icons-material';
import { Avatar, Box, Container, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import { USER } from '../../../core/api';

interface ProjectsLayoutProps {
  children?: React.ReactNode;
}

export const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({ children }) => {
  const result = useQuery(USER);
  const user = result.data?.user;

  return (
    <Container
      maxWidth='xs'
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <Paper
        sx={{
          width: '100%',
          padding: 1,
        }}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Box display='flex' alignItems='center' flexGrow={1}>
            {user && (
              <>
                <Avatar src={user.avatarUrl} alt='avatar' />
                <Box ml={1}>
                  <Typography variant='body1'>{user.name}</Typography>
                  <Typography variant='body2'>{user.email}</Typography>
                </Box>
              </>
            )}
          </Box>
          <IconButton>
            <LogoutOutlined />
          </IconButton>
        </Box>
        {children}
      </Paper>
    </Container>
  );
};
