import { KeyboardArrowRightOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { HandleBase, NodeBase } from '../../artifacts';
import { nodeColors } from '../../helpers';
import { NodeType, TriggerType } from '../../types';

const color = nodeColors[NodeType.Start];

interface StartData {
  name: string;
  trigger: TriggerType;
}

export const Start: React.FC<NodeProps<StartData>> = React.memo(({ id, data }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        position='absolute'
        left={-48}
        top={-48}
        color='#555'
        sx={{
          pointerEvents: 'none',
        }}>
        <Box fontSize={24} lineHeight={1}>
          {t<string>('chatbots:editor.nodes.Start.tooltip')}
        </Box>
        <Box fontSize={64} lineHeight={1}>
          ⤹
        </Box>
      </Box>
      <NodeBase color={color}>
        <Box display='flex' alignItems='center'>
          <KeyboardArrowRightOutlined
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
              {t<string>('chatbots:editor.nodes.Start.title')}
            </Typography>
          </Box>
        </Box>
      </NodeBase>
      <HandleBase type='source' id='next' position={Position.Right} nodeId={id} />
    </>
  );
});
