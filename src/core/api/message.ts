import { gql, TypedDocumentNode } from '@apollo/client';
import { Attachment, Button, Message } from '../types';

interface CreateMessageResult {
  createMessage: Message;
}

interface CreateMessageVariables {
  channelId: number;
  accountId: string;
  hsmId?: number;
  text?: string;
  attachments?: Attachment[];
  buttons?: Button[];
  variables?: Record<string, string>;
}

export const CREATE_MESSAGE: TypedDocumentNode<CreateMessageResult, CreateMessageVariables> = gql`
  mutation CreateMessage(
    $channelId: Int!
    $accountId: String!
    $hsmId: Int
    $text: String
    $attachments: [CreateAttachmentInput!]
    $buttons: [CreateButtonInput!]
    $variables: JSONObject
  ) {
    createMessage(
      channelId: $channelId
      accountId: $accountId
      hsmId: $hsmId
      text: $text
      attachments: $attachments
      buttons: $buttons
      variables: $variables
    ) {
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
  }
`;

interface MessagesResult {
  messages: Message[];
}

interface MessagesVariables {
  channelId: number;
  accountId: string;
}

export const MESSAGES: TypedDocumentNode<MessagesResult, MessagesVariables> = gql`
  query Messages($channelId: Int!, $accountId: String!) {
    messages(channelId: $channelId, accountId: $accountId) {
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
  }
`;

interface MessageReceivedResult {
  messageReceived: Message;
}

interface MessageReceivedVariables {
  channelId: number;
  accountId: string;
}

export const MESSAGE_RECEIVED: TypedDocumentNode<
  MessageReceivedResult,
  MessageReceivedVariables
> = gql`
  subscription MessageReceived($channelId: Int!, $accountId: String!) {
    messageReceived(channelId: $channelId, accountId: $accountId) {
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
  }
`;
