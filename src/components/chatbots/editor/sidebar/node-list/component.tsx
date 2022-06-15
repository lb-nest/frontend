import {
  AccountTreeOutlined,
  AssignmentOutlined,
  DialpadOutlined,
  ExitToAppOutlined,
  MessageOutlined,
  MiscellaneousServicesOutlined,
  RateReviewOutlined,
  TagOutlined,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NodeType } from '../../types';
import { DragNode } from './drag-node';

export const NodeList: React.FC = () => {
  const { t } = useTranslation();

  const handleDragStart = (type: NodeType): React.DragEventHandler => {
    return (event) => {
      event.dataTransfer.setData('application/reactflow', type);
      event.dataTransfer.effectAllowed = 'move';
    };
  };

  return (
    <Box padding={2}>
      <Typography variant='h6' gutterBottom>
        {t<string>('chatbots:editor.sidebar.nodeList.tooltip')}
      </Typography>
      <DragNode
        icon={<MessageOutlined />}
        color='#3d5afe'
        name={t<string>('chatbots:editor.nodes.SendMessage.title')}
        onDragStart={handleDragStart(NodeType.SendMessage)}
      />
      <DragNode
        icon={<RateReviewOutlined />}
        color='#35baf6'
        name={t<string>('chatbots:editor.nodes.CollectInput.title')}
        onDragStart={handleDragStart(NodeType.CollectInput)}
      />
      <DragNode
        icon={<DialpadOutlined />}
        color='#35baf6'
        name={t<string>('chatbots:editor.nodes.Buttons.title')}
        onDragStart={handleDragStart(NodeType.Buttons)}
      />
      <DragNode
        icon={<AccountTreeOutlined />}
        color='#ffeb3b'
        name={t<string>('chatbots:editor.nodes.Branch.title')}
        onDragStart={handleDragStart(NodeType.Branch)}
      />
      <DragNode
        icon={<MiscellaneousServicesOutlined />}
        color='#e91e63'
        name={t<string>('chatbots:editor.nodes.ServiceCall.title')}
        onDragStart={handleDragStart(NodeType.ServiceCall)}
      />
      <DragNode
        icon={<AssignmentOutlined />}
        color='#f44336'
        name={t<string>('chatbots:editor.nodes.Transfer.title')}
        onDragStart={handleDragStart(NodeType.Transfer)}
      />
      <DragNode
        icon={<TagOutlined />}
        color='#f44336'
        name={t<string>('chatbots:editor.nodes.AssignTag.title')}
        onDragStart={handleDragStart(NodeType.AssignTag)}
      />
      <DragNode
        icon={<ExitToAppOutlined />}
        color='#f44336'
        name={t<string>('chatbots:editor.nodes.Close.title')}
        onDragStart={handleDragStart(NodeType.Close)}
      />
    </Box>
  );
};
