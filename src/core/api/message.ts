import { gql, TypedDocumentNode } from '@apollo/client';
import { Attachment, HsmButton, Message } from '../types';

interface CreateMessageResult {
  createMessage: Message;
}

interface CreateMessageVariables {
  chatId: number;
  text?: string;
  attachments?: Attachment[];
  buttons?: HsmButton[];
}

export const CREATE_MESSAGE: TypedDocumentNode<CreateMessageResult, CreateMessageVariables> = gql`
  mutation CreateMessage(
    $chatId: Int!
    $text: String
    $attachments: [CreateAttachmentInput!]
    $buttons: [JSON!]
  ) {
    createMessage(chatId: $chatId, text: $text, attachments: $attachments, buttons: $buttons) {
      id
      fromMe
      status
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
  }
`;

interface MessagesResult {
  messages: Message[];
}

interface MessagesVariables {
  chatId: number;
}

export const MESSAGES: TypedDocumentNode<MessagesResult, MessagesVariables> = gql`
  query Messages($chatId: Int!) {
    messages(chatId: $chatId) {
      id
      fromMe
      status
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
  }
`;

interface MarkMesagesAsReadResult {
  markMessagesAsReadResult: boolean;
}

interface MarkMessagesAsReadVariables {
  chatId: number;
  ids: number[];
}

export const MARK_MESSAGES_AS_READ: TypedDocumentNode<
  MarkMesagesAsReadResult,
  MarkMessagesAsReadVariables
> = gql`
  mutation MarkMessagesAsRead($chatId: Int!, $ids: [Int!]!) {
    markMessagesAsRead(chatId: $chatId, ids: $ids)
  }
`;

interface MessagesReceivedResult {
  messagesReceived: Message;
}

interface MessagesReceivedVariables {
  chatId: number;
}

export const MESSAGES_RECEIVED: TypedDocumentNode<
  MessagesReceivedResult,
  MessagesReceivedVariables
> = gql`
  subscription MessagesReceived($chatId: Int!) {
    messagesReceived(chatId: $chatId) {
      id
      fromMe
      status
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
  }
`;
