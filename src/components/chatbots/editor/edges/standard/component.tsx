import { CloseOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { EdgeProps, getBezierPath, getEdgeCenter } from 'react-flow-renderer';

const size = 40;

export const Standard: React.FC<EdgeProps<undefined>> = React.memo(
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
  }) => {
    const edgePath = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    return (
      <>
        <path
          id={id}
          style={style}
          className='react-flow__edge-path'
          d={edgePath}
          markerEnd={markerEnd}
        />
        <foreignObject
          width={size}
          height={size}
          x={edgeCenterX - size / 2}
          y={edgeCenterY - size / 2}
          requiredExtensions='http://www.w3.org/1999/xhtml'>
          <IconButton
            disableRipple
            sx={{
              bgcolor: '#ffffff',
              color: '#f44336',
            }}
            onClick={() => {}}>
            <CloseOutlined />
          </IconButton>
        </foreignObject>
      </>
    );
  },
);
