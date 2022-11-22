import React from 'react';
import { Handle, HandleProps, useReactFlow } from 'react-flow-renderer';

interface HandleBaseProps extends HandleProps {
  nodeId: string;
}

export const HandleBase: React.FC<HandleBaseProps> = ({ nodeId, ...props }) => {
  const instance = useReactFlow();

  return (
    <Handle
      isValidConnection={() => !instance.getEdges().some((edge) => edge.source === nodeId)}
      style={{
        width: 16,
        height: 16,
        marginLeft: -4,
        marginRight: -4,
      }}
      {...props}
    />
  );
};
