import { DialpadOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import * as types from '../../../../../core/types';
import { HandleBase, NodeBase } from '../../artifacts';
import { nodeColors } from '../../helpers';
import { NodeType } from '../../types';

const color = nodeColors[NodeType.Buttons];
const height = 44.491;

export interface ButtonsData {
  name: string;
  text: string;
  buttons: types.Button[];
}

export const Buttons: React.FC<NodeProps<ButtonsData>> = React.memo(({ id, data, selected }) => {
  const { length } = data.buttons;

  const { t } = useTranslation();

  const buttons = React.useMemo(
    () =>
      data.buttons.map((button, i) => (
        <Button
          key={i}
          variant='outlined'
          disabled
          sx={{
            mt: 1,
          }}>
          {button.text ||
            t<string>('chatbots:editor.nodes.Buttons.button', {
              i,
            })}
        </Button>
      )),
    [data.buttons],
  );

  const handles = React.useMemo(
    () =>
      Array.from({ length }).map((_, i) => (
        <HandleBase
          key={i}
          type='source'
          id={i.toString()}
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
          <Box>
            <Typography variant='body1'>{data.name}</Typography>
            <Typography variant='body2'>
              {t<string>('chatbots:editor.nodes.Buttons.title')}
            </Typography>
          </Box>
        </Box>
        {buttons}
      </NodeBase>
      {handles}
    </>
  );
});
