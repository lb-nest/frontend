import { Box } from '@mui/material';
import React from 'react';

interface NodeBaseProps {
  color: string;
  children: React.ReactNode;
}

export const NodeBase: React.FC<NodeBaseProps> = ({ color, children }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      width={320}
      minHeight={100}
      borderRadius={1}
      bgcolor='#ffffff'
      boxShadow='0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)'
      overflow='hidden'>
      <Box width='100%' height={8} bgcolor={color} flexShrink={0} />
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        flexGrow={1}
        mb={1}
        padding={2}>
        {children}
      </Box>
    </Box>
  );
};
