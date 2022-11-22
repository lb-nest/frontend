import { Box, Typography } from '@mui/material';
import React from 'react';
import { Node } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';

interface NodeEditorProps {
  node: Node<{
    name: string;
    [key: string]: any;
    onChange: (value: any) => void;
    onDelete: () => void;
  }>;
}

export const NodeEditor: React.FC<NodeEditorProps> = ({ node }) => {
  const { t } = useTranslation();

  return (
    <Box padding={2}>
      <Typography variant='h6' gutterBottom>
        {t<string>('chatbots:editor.sidebar.nodeEditor.title', node.data)}
      </Typography>
      <Box>{/* TODO: в зависимости от типа ноды, показывать поля для редактирования */}</Box>
    </Box>
  );
};
