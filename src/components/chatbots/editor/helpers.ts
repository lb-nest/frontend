import { NodeData, NodeType, TriggerType, ValidationType } from './types';

export const createEdgeId = () => `edge${Date.now()}`;

export const createNodeId = () => `node${Date.now()}`;

export const defaultNodeData: Record<string, NodeData> = {
  [NodeType.Start]: {
    name: 'Start',
    trigger: TriggerType.NewChat,
  },
  [NodeType.SendMessage]: {
    name: 'SendMessage',
    text: '',
    attachments: [],
  },
  [NodeType.CollectInput]: {
    name: 'CollentInput',
    text: '',
    attachments: [],
    variable: null,
    validation: ValidationType.String,
  },
  [NodeType.Buttons]: {
    name: 'Buttons',
    text: '',
    buttons: [],
  },
  [NodeType.Branch]: {
    name: 'Branch',
    branches: [],
    default: null,
  },
  [NodeType.ServiceCall]: {
    name: 'ServiceCall',
    url: null,
    headers: {},
    body: null,
    variable: null,
  },
  [NodeType.Transfer]: {
    name: 'Transfer',
    assignedTo: null,
  },
  [NodeType.AssignTag]: {
    name: 'AssignTag',
    tagId: null,
  },
  [NodeType.Close]: {
    name: 'Close',
  },
};

export const getNodeDataByType = (type: NodeType): NodeData => {
  return defaultNodeData[type];
};

export const nodeColors: Record<NodeType, string> = {
  [NodeType.Start]: '#6fbf73',
  [NodeType.SendMessage]: '#3d5afe',
  [NodeType.CollectInput]: '#35baf6',
  [NodeType.Buttons]: '#35baf6',
  [NodeType.Branch]: '#ffeb3b',
  [NodeType.ServiceCall]: '#e91e63',
  [NodeType.Transfer]: '#f44336',
  [NodeType.AssignTag]: '#ffac33',
  [NodeType.Close]: '#f44336',
};
