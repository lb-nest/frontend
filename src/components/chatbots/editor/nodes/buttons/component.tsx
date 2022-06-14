import { DialpadOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { HsmButton } from '../../../../../core/types';
import { HandleBase, NodeBase } from '../../fragments';

interface ButtonsData {
  text: string;
  buttons: HsmButton[];
}

export const Buttons: React.FC<NodeProps<ButtonsData>> = React.memo(({ id, data }) => {
  const { t } = useTranslation();

  const color = '#e91e63';

  return (
    <>
      <HandleBase type='target' position={Position.Left} nodeId={id} />
      <NodeBase color={color}>
        <Box display='flex' alignItems='center'>
          <DialpadOutlined
            sx={{
              mr: 1,
              padding: 0.5,
              bgcolor: `${color}2f`,
              color,
              fontSize: 30,
              borderRadius: 2,
            }}
          />
          <Typography>{t<string>('chatbots:editor.nodes.Buttons.title')}</Typography>
        </Box>
      </NodeBase>
    </>
  );
});
