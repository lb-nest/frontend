import { AddOutlined, KeyboardArrowLeftOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import { Node } from 'react-flow-renderer';
import { NodeList } from './node-list';

const width = 360;

interface SidebarProps {
  node?: Node<any>;
}

export const Sidebar: React.FC<SidebarProps> = ({ node }) => {
  const [show, setShow] = React.useState<boolean>(false);

  React.useEffect(() => {
    setShow(node !== undefined);
  }, [node]);

  return (
    <>
      {show && (
        <Box
          width={width}
          height='100%'
          position='absolute'
          left={0}
          top={0}
          bgcolor='#ffffff'
          zIndex={1001}>
          <NodeList />
        </Box>
      )}
      <Box position='absolute' left={show ? width : 0} top={0} padding={1} zIndex={1001}>
        <IconButton
          size='large'
          onClick={() => {
            setShow((prev) => !prev);
          }}>
          {show ? <KeyboardArrowLeftOutlined /> : <AddOutlined />}
        </IconButton>
      </Box>
    </>
  );
};
