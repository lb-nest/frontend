export enum EdgeType {
  Standard = 'Standard',
}

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

export interface Flow {
  edges: any[];
  nodes: any[];
  variables: any[];
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
