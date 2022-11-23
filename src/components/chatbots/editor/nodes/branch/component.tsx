import { AccountTreeOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { HandleBase, NodeBase } from '../../artifacts';
import { nodeColors } from '../../helpers';
import { BranchItem, NodeType } from '../../types';

const color = nodeColors[NodeType.Branch];

export interface BranchData {
  name: string;
  branches: BranchItem[];
}

export const Branch: React.FC<NodeProps<BranchData>> = React.memo(({ id, data, selected }) => {
  const { t } = useTranslation();

  return (
    <>
      <HandleBase type='target' position={Position.Left} nodeId={id} />
      <NodeBase color={color} selected={selected}>
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
          <Box>
            <Typography variant='body1'>{data.name}</Typography>
            <Typography variant='body2'>
              {t<string>('chatbots:editor.nodes.Branch.title')}
            </Typography>
          </Box>
        </Box>
      </NodeBase>
    </>
  );
});
