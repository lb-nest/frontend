import { WorkOutline } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Project } from '../../../core/types';

interface ProjectCardProps extends Project {
  onClick?: (id: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, slug, onClick }) => {
  return (
    <Paper
      onClick={() => onClick?.(id)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 1,
        padding: 2,
        cursor: 'pointer',
        transition: '200ms ease',
        ':hover': {
          bgcolor: '#f1f1f1',
        },
      }}>
      <Box display='flex' alignItems='center' flexGrow={1}>
        <WorkOutline />
        <Typography
          variant='body1'
          sx={{
            ml: 1,
          }}>
          {name}
        </Typography>
      </Box>
      <Typography variant='body2'>#{slug}</Typography>
    </Paper>
  );
};
