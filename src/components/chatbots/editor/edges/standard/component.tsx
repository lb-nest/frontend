import { CloseOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { EdgeProps, getBezierPath, getEdgeCenter } from 'react-flow-renderer';

const size = 40;

export const Standard: React.FC<
  EdgeProps<{
    onDelete?: () => void;
  }>
> = React.memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
  }) => {
    const [centerX, centerY] = getEdgeCenter({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    const edgePath = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
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
          <IconButton
            disableRipple
            color='error'
            sx={{
              bgcolor: '#ffffff',
              transform: 'scale(0.75)',
            }}
            onClick={data?.onDelete}>
            <CloseOutlined />
          </IconButton>
        </foreignObject>
      </>
    );
  },
);
