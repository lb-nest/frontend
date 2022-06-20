import { NodeData, NodeType, TriggerType } from './types';

export const createEdgeId = () => `edge${Date.now()}`;

export const createNodeId = () => `node${Date.now()}`;

export const getNodeDataByType = (type: NodeType): NodeData => {
  return {
    [NodeType.Start]: {
      name: '',
      trigger: TriggerType.NewChat,
    },
    [NodeType.SendMessage]: {
      name: '',
      text: '',
      attachments: [],
    },
    [NodeType.CollectInput]: {
      name: '',
      text: '',
      attachments: [],
      variable: null,
      validation: null,
    },
    [NodeType.Buttons]: {
      name: '',
      text: '',
      attachments: [],
      buttons: [],
    },
    [NodeType.Branch]: {
      name: '',
      branches: [],
      default: null,
    },
    [NodeType.ServiceCall]: {
      name: '',
      request: {
        url: null,
        headers: {},
        body: null,
      },
      response: {},
    },
    [NodeType.Transfer]: {
      name: '',
      assignedTo: 0,
    },
    [NodeType.AssignTag]: {
      name: '',
      tag: null,
    },
    [NodeType.Close]: {
      name: '',
    },
  }[type];
};
