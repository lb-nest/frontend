import { Edge, Node } from 'react-flow-renderer';
import { EdgeData, NodeData, Variable } from '../../components/chatbots/editor/types';

export interface Flow {
  edges: Edge<EdgeData>[];
  nodes: Node<NodeData>[];
  variables: Variable[];
}

export interface Chatbot {
  id: number;
  name: string;
  version: string;
  flow: Flow;
  enabled: boolean;
  error?: string;
  createdAt: string;
  updatedAt: string;
}
