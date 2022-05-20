import { Channel } from './channel';

export enum ApprovalStatus {
  Requested = 'Requested',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export interface Approval {
  channel: Channel;
  status: ApprovalStatus;
}

export enum HsmButtonType {
  QuickReply = 'QuickReply',
}

export interface HsmButton extends Record<string, any> {
  type: HsmButtonType;
  text: string;
}

export interface Hsm {
  id: number;
  code: string;
  text: string;
  buttons?: HsmButton[];
  approval: Approval[];
}
