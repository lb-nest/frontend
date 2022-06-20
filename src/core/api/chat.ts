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
        username
        name
        avatarUrl
        notes
        tags {
          tag {
            id
            name
            description
            color
          }
        }
        resolved
        assignedTo {
          id
          name
        }
        status
      }
      messages {
        id
        status
        fromMe
        content {
          text
          attachments {
            type
            url
            name
          }
          buttons
        }
        createdAt
        updatedAt
      }
      unreadCount
    }
  }
`;

interface ChatsReceivedResult {
  chatsReceived: Chat;
}

export const CHATS_RECEIVED: TypedDocumentNode<ChatsReceivedResult> = gql`
  subscription ChatsReceived {
    chatsReceived {
      id
      contact {
        id
        username
        name
        avatarUrl
        notes
        tags {
          tag {
            id
            name
            description
            color
          }
        }
        resolved
        assignedTo {
          id
          name
        }
        status
      }
      messages {
        id
        status
        fromMe
        content {
          text
          attachments {
            type
            url
            name
          }
          buttons
        }
        createdAt
        updatedAt
      }
      unreadCount
    }
  }
`;

interface ChatByIdResult {
  chatById: Chat;
}

interface ChatByIdVariables {
  id: number;
}

export const CHAT_BY_ID: TypedDocumentNode<ChatByIdResult, ChatByIdVariables> = gql`
  query ChatById($id: Int!) {
    chatById(id: $id) {
      id
      contact {
        id
        username
        name
        avatarUrl
        notes
        tags {
          tag {
            id
            name
            description
            color
          }
        }
        resolved
        assignedTo {
          id
          name
        }
        status
      }
      messages {
        id
        status
        fromMe
        content {
          text
          attachments {
            type
            url
            name
          }
          buttons
        }
        createdAt
        updatedAt
      }
      unreadCount
    }
  }
`;
