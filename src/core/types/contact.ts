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
  tags: Array<{
    tag: Omit<Tag, 'parent' | 'children'>;
  }>;
  status: ContactStatus;
  assignedTo: AssignedTo | null;
  priority: number;
  resolved: boolean;
  customFields: CustomField[];
}

export enum AssigneeType {
  User = 'User',
  Chatbot = 'Chatbot',
}
