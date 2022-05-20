import { HsmButton } from './hsm';

export enum AttachmentType {
  Audio = 'Audio',
  Document = 'Document',
  Image = 'Image',
  Video = 'Video',
}

export interface Attachment {
  type: AttachmentType;
  url: string;
  name: string;
}

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
    buttons?: HsmButton[];
  }>;
  createdAt: string;
  updatedAt: string;
}
