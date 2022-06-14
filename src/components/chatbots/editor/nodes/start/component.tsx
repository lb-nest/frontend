import { KeyboardArrowRightOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { HandleBase, NodeBase } from '../../fragments';
import { TriggerType } from '../../types';

interface StartData {
  trigger: TriggerType;
}

export const Start: React.FC<NodeProps<StartData>> = React.memo(({ id, data }) => {
  const { t } = useTranslation();

  const color = '#6fbf73';

  return (
    <>
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
          <Typography>{t<string>('chatbots:editor.nodes.Start.title')}</Typography>
        </Box>
      </NodeBase>
      <HandleBase type='source' id='next' position={Position.Right} nodeId={id} />
    </>
  );
});
