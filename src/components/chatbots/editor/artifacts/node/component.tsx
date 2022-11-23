import { Box } from '@mui/material';
import React from 'react';

interface NodeBaseProps {
  selected?: boolean;
  color: string;
  children: React.ReactNode;
}

export const NodeBase: React.FC<NodeBaseProps> = ({ selected = false, color, children }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      width={320}
      minHeight={100}
      padding='16px 16px 24px 16px'
      borderRadius={1}
      borderTop={`8px solid ${color}`}
      bgcolor='#ffffff'
      boxShadow='0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)'
      overflow='hidden'
      sx={{
        outlineWidth: selected ? 4 : 0,
        outlineStyle: 'solid',
        outlineColor: '#b1b1b7',
      }}>
      {children}
    </Box>
  );
};
