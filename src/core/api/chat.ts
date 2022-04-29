import { gql, TypedDocumentNode } from '@apollo/client';
import { Chat, ChatsCount, ContactStatus } from '../types';

interface ChatsCountResult {
  chatsCount: ChatsCount;
}

export const CHATS_COUNT: TypedDocumentNode<ChatsCountResult> = gql`
  query ChatsCount {
    chatsCount {
      assigned
      unassigned
    }
  }
`;

interface ChatsResult {
  chats: Chat[];
}

interface ChatsVariables {
  assignedTo?: number;
  status: ContactStatus;
}

export const CHATS: TypedDocumentNode<ChatsResult, ChatsVariables> = gql`
  query Chats($status: ContactStatus!, $assignedTo: Int) {
    chats(status: $status, assignedTo: $assignedTo) {
      id
      contact {
        id
        name
      }
      messages {
        id
        fromMe
        content {
          text
        }
        createdAt
        updatedAt
      }
    }
  }
`;
