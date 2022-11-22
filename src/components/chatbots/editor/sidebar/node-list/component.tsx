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
import { nodeColors } from '../../helpers';
import { NodeType } from '../../types';
import { DragNode } from './drag-node';

export const NodeList: React.FC = () => {
  const { t } = useTranslation();

  const handleDragStart = React.useCallback((type: NodeType): React.DragEventHandler => {
    return (event) => {
      event.dataTransfer.setData('application/react-flow', type);
      event.dataTransfer.effectAllowed = 'move';
    };
  }, []);

  const dragNodes: Record<
    Exclude<NodeType, NodeType.Start>,
    Parameters<typeof DragNode>[0]
  > = React.useMemo(
    () => ({
      [NodeType.SendMessage]: {
        icon: <MessageOutlined />,
        color: nodeColors[NodeType.Start],
        name: t<string>('chatbots:editor.nodes.SendMessage.title'),
        onDragStart: handleDragStart(NodeType.SendMessage),
      },
      [NodeType.CollectInput]: {
        icon: <RateReviewOutlined />,
        color: nodeColors[NodeType.CollectInput],
        name: t<string>('chatbots:editor.nodes.CollectInput.title'),
        onDragStart: handleDragStart(NodeType.CollectInput),
      },
      [NodeType.Buttons]: {
        icon: <DialpadOutlined />,
        color: nodeColors[NodeType.Buttons],
        name: t<string>('chatbots:editor.nodes.Buttons.title'),
        onDragStart: handleDragStart(NodeType.Buttons),
      },
      [NodeType.Branch]: {
        icon: <AccountTreeOutlined />,
        color: nodeColors[NodeType.Branch],
        name: t<string>('chatbots:editor.nodes.Branch.title'),
        onDragStart: handleDragStart(NodeType.Branch),
      },
      [NodeType.ServiceCall]: {
        icon: <MiscellaneousServicesOutlined />,
        color: nodeColors[NodeType.ServiceCall],
        name: t<string>('chatbots:editor.nodes.ServiceCall.title'),
        onDragStart: handleDragStart(NodeType.ServiceCall),
      },
      [NodeType.Transfer]: {
        icon: <AssignmentOutlined />,
        color: nodeColors[NodeType.Transfer],
        name: t<string>('chatbots:editor.nodes.Transfer.title'),
        onDragStart: handleDragStart(NodeType.Transfer),
      },
      [NodeType.AssignTag]: {
        icon: <TagOutlined />,
        color: nodeColors[NodeType.AssignTag],
        name: t<string>('chatbots:editor.nodes.AssignTag.title'),
        onDragStart: handleDragStart(NodeType.AssignTag),
      },
      [NodeType.Close]: {
        icon: <ExitToAppOutlined />,
        color: nodeColors[NodeType.Close],
        name: t<string>('chatbots:editor.nodes.Close.title'),
        onDragStart: handleDragStart(NodeType.Close),
      },
    }),
    [t, handleDragStart],
  );

  return (
    <Box padding={2}>
      <Typography variant='h6' gutterBottom>
        {t<string>('chatbots:editor.sidebar.nodeList.title')}
      </Typography>
      {Object.entries(dragNodes).map(([key, dragNode]) => (
        <DragNode key={key} {...dragNode} />
      ))}
    </Box>
  );
};
