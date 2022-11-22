import { Channel } from './channel';
import { Attachment } from './message';

export enum ApprovalStatus {
  Requested = 'Requested',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export interface Approval {
  channel: Channel;
  status: ApprovalStatus;
}

export enum ButtonType {
  QuickReply = 'QuickReply',
  Url = 'Url',
  Phone = 'Phone',
}

export interface Button {
  type: ButtonType;
  text: string;
  url?: string;
  phone?: string;
}

export interface Hsm {
  id: number;
  code: string;
  text: string;
  attachments?: Attachment[];
  buttons?: Button[];
  approval: Approval[];
}
