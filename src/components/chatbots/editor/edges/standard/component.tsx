import { CloseOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import { EdgeProps, getEdgeCenter, getSmoothStepPath } from 'react-flow-renderer';

const size = 34;

export const Standard: React.FC<EdgeProps<{ onDelete?: () => void }>> = React.memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data,
  }) => {
    const [centerX, centerY] = getEdgeCenter({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    const edgePath = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      centerX,
      centerY,
      borderRadius: 20,
    });

    return (
      <>
        <path
          id={id}
          style={{
            strokeWidth: 3,
            ...style,
          }}
          className='react-flow__edge-path'
          d={edgePath}
          markerEnd={markerEnd}
        />
        <foreignObject
          width={size}
          height={size}
          x={centerX - size / 2}
          y={centerY - size / 2}
          requiredExtensions='http://www.w3.org/1999/xhtml'>
          <Box width='min-content' height='min-content' bgcolor='#ffffff' borderRadius='50%'>
            <IconButton size='small' color='error' onClick={data?.onDelete}>
              <CloseOutlined />
            </IconButton>
          </Box>
        </foreignObject>
      </>
    );
  },
);
