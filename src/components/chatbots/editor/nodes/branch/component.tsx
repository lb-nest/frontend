import { AccountTreeOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { HandleBase, NodeBase } from '../../artifacts';
import { nodeColors } from '../../helpers';
import * as types from '../../types';

const color = nodeColors[types.NodeType.Branch];
const height = 44.006;

export interface BranchData {
  name: string;
  branches: types.Branch[];
}

export const Branch: React.FC<NodeProps<BranchData>> = React.memo(({ id, data, selected }) => {
  const length = data.branches.length + 1;

  const { t } = useTranslation();

  const branches = React.useMemo(
    () =>
      Array.from({ length }).map((_, i) => (
        <Box key={i} display='flex' alignItems='center' height={height}>
          {i === length - 1
            ? t<string>('chatbots:editor.nodes.Branch.defaultBranch')
            : t<string>('chatbots:editor.nodes.Branch.branch', {
                i,
              })}
        </Box>
      )),
    [length],
  );

  const handles = React.useMemo(
    () =>
      Array.from({ length }).map((_, i) => (
        <HandleBase
          key={i}
          type='source'
          id={i === length - 1 ? 'default' : i.toString()}
          position={Position.Right}
          nodeId={id}
          style={{
            top: 4 + height * (i + 2),
          }}
        />
      )),
    [length],
  );

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
        {branches}
      </NodeBase>
      {handles}
    </>
  );
});
