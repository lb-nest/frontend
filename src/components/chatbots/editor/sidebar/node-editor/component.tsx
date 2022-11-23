import { DeleteOutlined } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Node } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import {
  AssignTagEditor,
  BranchEditor,
  ButtonsEditor,
  CloseEditor,
  CollectInputEditor,
  SendMessageEditor,
  ServiceCallEditor,
  StartEditor,
  TransferEditor,
} from '../../nodes';
import { NodeType } from '../../types';

interface NodeEditorProps {
  node: Node;
}

export const NodeEditor: React.FC<NodeEditorProps> = ({ node }) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    node.data.onDelete();
  };

  const editor = React.useMemo(() => {
    const nodes: Record<NodeType, JSX.Element> = {
      [NodeType.AssignTag]: <AssignTagEditor {...node.data} />,
      [NodeType.Branch]: <BranchEditor {...node.data} />,
      [NodeType.Buttons]: <ButtonsEditor {...node.data} />,
      [NodeType.Close]: <CloseEditor {...node.data} />,
      [NodeType.CollectInput]: <CollectInputEditor {...node.data} />,
      [NodeType.SendMessage]: <SendMessageEditor {...node.data} />,
      [NodeType.ServiceCall]: <ServiceCallEditor {...node.data} />,
      [NodeType.Start]: <StartEditor {...node.data} />,
      [NodeType.Transfer]: <TransferEditor {...node.data} />,
    };

    return nodes[node.type as NodeType];
  }, [node.type, node.data]);

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
      <Box>{editor}</Box>
    </Box>
  );
};
