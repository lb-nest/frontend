import { AccountTreeOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { HandleBase, NodeBase } from '../../artifacts';
import { nodeColors } from '../../helpers';
import { BranchItem, NodeType } from '../../types';

const color = nodeColors[NodeType.Branch];

interface BranchData {
  branches: BranchItem[];
}

export const Branch: React.FC<NodeProps<BranchData>> = React.memo(({ id, data }) => {
  const { t } = useTranslation();

  return (
    <>
      <HandleBase type='target' position={Position.Left} nodeId={id} />
      <NodeBase color={color}>
        <Box display='flex' alignItems='center'>
          <AccountTreeOutlined
            sx={{
              mr: 1,
              padding: 0.5,
              bgcolor: `${color}2f`,
              color,
              fontSize: 30,
              borderRadius: 2,
            }}
          />
          <Typography>{t<string>('chatbots:editor.nodes.Branch.title')}</Typography>
        </Box>
      </NodeBase>
    </>
  );
});
