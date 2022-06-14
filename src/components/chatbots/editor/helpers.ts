import { NodeData, NodeType } from './types';

export const createEdgeId = () => `edge${Date.now()}`;

export const createNodeId = () => `node${Date.now()}`;

export const getNodeDataByType = (type: NodeType): NodeData => {
  return {};
};
