import { Variable } from '../../components/chatbots/editor/types';

export interface Flow {
  edges: any[];
  nodes: any[];
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
