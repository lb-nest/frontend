import { NodeProps } from 'react-flow-renderer';
import {
  AssignTag,
  Branch,
  Buttons,
  Close,
  CollectInput,
  SendMessage,
  ServiceCall,
  Start,
  Transfer,
} from './nodes';
import { NodeType } from './types';

export const nodeTypes: Record<NodeType, React.FC<NodeProps>> = {
  [NodeType.Start]: Start,
  [NodeType.SendMessage]: SendMessage,
  [NodeType.CollectInput]: CollectInput,
  [NodeType.Buttons]: Buttons,
  [NodeType.Branch]: Branch,
  [NodeType.ServiceCall]: ServiceCall,
  [NodeType.Transfer]: Transfer,
  [NodeType.AssignTag]: AssignTag,
  [NodeType.Close]: Close,
};
