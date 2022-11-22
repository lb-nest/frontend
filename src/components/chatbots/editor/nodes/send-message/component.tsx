import { MessageOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { Attachment } from '../../../../../core/types';
import { HandleBase, NodeBase } from '../../artifacts';
import { nodeColors } from '../../helpers';
import { NodeType } from '../../types';

const color = nodeColors[NodeType.SendMessage];

interface SendMessageData {
  name: string;
  text: string;
  attachments: Attachment[];
}

export const SendMessage: React.FC<NodeProps<SendMessageData>> = React.memo(({ id, data }) => {
  const { t } = useTranslation();

  return (
    <>
      <HandleBase type='target' position={Position.Left} nodeId={id} />
      <NodeBase color={color}>
        <Box display='flex' alignItems='center'>
          <MessageOutlined
            sx={{
              mr: 1,
              padding: 0.5,
              bgcolor: `${color}2f`,
              color,
              fontSize: 30,
              borderRadius: 2,
            }}
          />
          <Box>
            <Typography variant='body1'>{data.name}</Typography>
            <Typography variant='body2'>
              {t<string>('chatbots:editor.nodes.SendMessage.title')}
            </Typography>
          </Box>
        </Box>
      </NodeBase>
      <HandleBase type='source' id='next' position={Position.Right} nodeId={id} />
    </>
  );
});
