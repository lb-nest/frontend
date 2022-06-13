import { gql, TypedDocumentNode } from '@apollo/client';
import { Chatbot, Flow } from '../types';

interface CreateChatbotResult {
  createChatbot: Chatbot;
}

interface CreateChatbotVariables {
  name: string;
  version?: string;
  flow: Flow;
  enabled?: boolean;
}

export const CREATE_CHATBOT: TypedDocumentNode<CreateChatbotResult, CreateChatbotVariables> = gql`
  mutation CreateChatbot($name: String!, $version: String, $flow: JSON!, $enabled: Boolean) {
    createChatbot(name: $name, version: $version, flow: $flow, enabled: $enabled) {
      id
      name
      version
      flow
      enabled
      error
      createdAt
      updatedAt
    }
  }
`;

interface ChatbotsResult {
  chatbots: Chatbot[];
}

export const CHATBOTS: TypedDocumentNode<ChatbotsResult> = gql`
  query Chatbots {
    chatbots {
      id
      name
      version
      flow
      enabled
      error
      createdAt
      updatedAt
    }
  }
`;

interface ChatbotByIdResult {
  chatbotById: Chatbot;
}

interface ChatbotByIdVariables {
  id: number;
}

export const CHATBOT_BY_ID: TypedDocumentNode<ChatbotByIdResult, ChatbotByIdVariables> = gql`
  query ChatbotById($id: Int!) {
    chatbotById(id: $id) {
      id
      name
      version
      flow
      enabled
      error
      createdAt
      updatedAt
    }
  }
`;

interface UpdateChatbotResult {
  updateChatbot: Chatbot;
}

interface UpdateChatbotVariables extends Partial<CreateChatbotVariables> {
  id: number;
}

export const UPDATE_CHATBOT: TypedDocumentNode<UpdateChatbotResult, UpdateChatbotVariables> = gql`
  mutation UpdateChatbot(
    $id: Int!
    $name: String
    $version: String
    $flow: JSON
    $enabled: Boolean
  ) {
    updateChatbot(id: $id, name: $name, version: $version, flow: $flow, enabled: $enabled) {
      id
      name
      version
      flow
      enabled
      error
      createdAt
      updatedAt
    }
  }
`;

interface RemoveChatbotResult {
  removeChatbot: Chatbot;
}

interface RemoveChatbotVariables {
  id: number;
}

export const REMOVE_CHATBOT: TypedDocumentNode<RemoveChatbotResult, RemoveChatbotVariables> = gql`
  mutation RemoveChatbot($id: Int!) {
    removeChatbot(id: $id) {
      id
      name
      version
      flow
      enabled
      error
      createdAt
      updatedAt
    }
  }
`;
