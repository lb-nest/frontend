import { gql, TypedDocumentNode } from '@apollo/client';
import { AssigneeType, Chat, ContactStatus } from '../types';

interface ChatsResult {
  chats: Chat[];
}

interface ChatsVariables {
  assignedTo?: {
    id: number;
    type: AssigneeType;
  };
  status: ContactStatus;
}

export const CHATS: TypedDocumentNode<ChatsResult, ChatsVariables> = gql`
  query Chats($status: ContactStatus!, $assignedTo: CreateAssignedToInput) {
    chats(status: $status, assignedTo: $assignedTo) {
      channelId
      accountId
      contact {
        id
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
        status
        assignedTo {
          id
          name
        }
        priority
        resolved
        customFields {
          id
          name
          value
        }
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
          buttons {
            type
            text
            url
            phone
          }
        }
        createdAt
        updatedAt
      }
      unreadCount
    }
  }
`;

interface ChatReceivedResult {
  chatReceived: Chat;
}

export const CHAT_RECEIVED: TypedDocumentNode<ChatReceivedResult> = gql`
  subscription ChatReceived {
    chatReceived {
      channelId
      accountId
      contact {
        id
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
        status
        assignedTo {
          id
          name
        }
        priority
        resolved
        customFields {
          id
          name
          value
        }
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
          buttons {
            type
            text
            url
            phone
          }
        }
        createdAt
        updatedAt
      }
      unreadCount
    }
  }
`;

interface ChatResult {
  chat: Chat;
}

interface ChatVariables {
  channelId: number;
  accountId: string;
}

export const CHAT: TypedDocumentNode<ChatResult, ChatVariables> = gql`
  query Chat($channelId: Int!, $accountId: String!) {
    chat(channelId: $channelId, accountId: $accountId) {
      channelId
      accountId
      contact {
        id
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
        status
        assignedTo {
          id
          name
        }
        priority
        resolved
        customFields {
          id
          name
          value
        }
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
          buttons {
            type
            text
            url
            phone
          }
        }
        createdAt
        updatedAt
      }
      unreadCount
    }
  }
`;
