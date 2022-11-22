import { DeleteOutlined } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Node } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { NodeType } from '../../types';

interface NodeEditorProps {
  node: Node<{
    name: string;
    [property: string]: any;
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => void;
    onDelete: () => void;
  }>;
}

export const NodeEditor: React.FC<NodeEditorProps> = ({ node }) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    node.data.onDelete();
  };

  const title = t<string>('chatbots:editor.sidebar.nodeEditor.title', node);

  return (
    <Box p={2}>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        height={36}>
        <Tooltip title={title} placement='right'>
          <Typography variant='h6' gutterBottom noWrap m={0}>
            {title}
          </Typography>
        </Tooltip>
        {node.type !== NodeType.Start && (
          <IconButton
            size='small'
            color='error'
            sx={{
              ml: 2,
            }}
            onClick={handleDelete}>
            <DeleteOutlined />
          </IconButton>
        )}
      </Box>
      <Box>{/* TODO: в зависимости от типа ноды, показывать поля для редактирования */}</Box>
    </Box>
  );
};
