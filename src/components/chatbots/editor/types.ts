import { Standard } from './edges';
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

export enum EdgeType {
  Standard = 'Standard',
}

export const edgeTypes = {
  [EdgeType.Standard]: Standard,
};

export enum NodeType {
  Start = 'Start',
  SendMessage = 'SendMessage',
  CollectInput = 'CollectInput',
  Buttons = 'Buttons',
  Branch = 'Branch',
  ServiceCall = 'ServiceCall',
  Transfer = 'Transfer',
  AssignTag = 'AssignTag',
  Close = 'Close',
}

export const nodeTypes = {
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
