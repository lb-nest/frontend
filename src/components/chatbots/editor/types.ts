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

export type EdgeData = undefined;

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

export type NodeData = Record<string, any>;

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

export enum TriggerType {
  NewChat = 'NewChat',
  NewAssignment = 'NewAssignment',
}

export enum VariableType {
  Any = 'Any',
}

export interface Variable {
  id: string;
  type: VariableType;
  name: string;
  value?: any;
}

export enum ComparsionType {
  All = 'All',
  Any = 'Any',
}

export enum OperatorType {
  Eq = 'Eq',
  Neq = 'Neq',
  Lt = 'Lt',
  Lte = 'Lte',
  Gt = 'Gt',
  Gte = 'Gte',
}

export interface Condition {
  variable1: string;
  operator: OperatorType;
  variable2: string;
}

export interface BranchItem {
  type: ComparsionType;
  conditions: Condition;
}

export enum ValidationType {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Email = 'Email',
  Phone = 'Phone',
  RegExp = 'RegExp',
}
