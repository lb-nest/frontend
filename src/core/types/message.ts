import { Attachment } from './attachment';

export enum MessageStatus {
  Accepted = 'Accepted',
  Delivered = 'Delivered',
  Read = 'Read',
  Error = 'Error',
}

export interface Message {
  id: number;
  status: MessageStatus;
  fromMe: boolean;
  content: Array<{
    text: string;
    attachments: Attachment[];
    buttons?: any[];
  }>;
  createdAt: string;
  updatedAt: string;
}
