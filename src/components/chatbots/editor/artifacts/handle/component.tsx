import merge from 'deepmerge';
import React from 'react';
import { Handle, HandleProps, useReactFlow } from 'react-flow-renderer';

const defaultStyle: React.CSSProperties = {
  width: 16,
  height: 16,
  top: 46,
  marginLeft: -4,
  marginRight: -4,
};

interface HandleBaseProps extends HandleProps {
  nodeId: string;
  style?: React.CSSProperties;
}

export const HandleBase: React.FC<HandleBaseProps> = ({ id, nodeId, style = {}, ...props }) => {
  const instance = useReactFlow();

  return (
    <Handle
      id={id}
      isValidConnection={() =>
        !instance.getEdges().some((edge) => edge.source === nodeId && edge.sourceHandle === id)
      }
      style={merge(defaultStyle, style)}
      {...props}
    />
  );
};
