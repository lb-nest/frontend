import { gql, TypedDocumentNode } from '@apollo/client';
import { Message } from '../types';

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
