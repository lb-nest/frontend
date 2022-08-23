import { CustomField } from './custom-field';
import { Tag } from './tag';

export interface AssignedTo {
  id: number;
  name: string;
}

export enum ContactStatus {
  Open = 'Open',
  Closed = 'Closed',
}

export interface Contact {
  id: number;
  name: string;
  avatarUrl: string;
  notes: string;
  status: ContactStatus;
  telegramId: string | null;
  webchatId: string | null;
  whatsappId: string | null;
  assignedTo: AssignedTo | null;
  priority: number;
  resolved: boolean;
  customFields: CustomField[];
  chats: Array<{
    id: number;
  }>;
  tags: Array<{
    tag: Omit<Tag, 'parent' | 'children'>;
  }>;
}
