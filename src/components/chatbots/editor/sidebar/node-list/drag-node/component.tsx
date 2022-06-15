import { Box, Typography } from '@mui/material';

interface DragNodeProps {
  icon: any;
  color: string;
  name: string;
  onDragStart: React.DragEventHandler;
}

export const DragNode: React.FC<DragNodeProps> = ({ icon, color, name, onDragStart }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      mb={1}
      padding={2}
      bgcolor={`${color}2f`}
      borderRadius={2}
      draggable
      onDragStart={onDragStart}
      sx={{
        cursor: 'grab',
        ':last-child': {
          mb: 0,
        },
      }}>
      <Box mr={1} color={color} lineHeight={1}>
        {icon}
      </Box>
      <Typography>{name}</Typography>
    </Box>
  );
};
