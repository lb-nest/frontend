export enum EdgeType {
  Standard = 'Standard',
}

export type EdgeData = undefined;

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

export interface NodeData extends Record<string, any> {
  name: string;
}

export enum TriggerType {
  NewChat = 'NewChat',
  Webhook = 'Webhook',
}

export enum VariableType {
  Any = 'Any',
}

export interface Variable {
  name: string;
  type: VariableType;
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
  Includes = 'Includes',
  StartsWith = 'StartsWith',
  EndsWith = 'EndsWith',
}

export interface Condition {
  variable1: string;
  operator: OperatorType;
  variable2: string;
}

export interface Branch {
  type: ComparsionType;
  conditions: Condition[];
}

export enum ValidationType {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Email = 'Email',
  Phone = 'Phone',
  RegExp = 'RegExp',
}
