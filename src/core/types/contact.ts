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
  username: string;
  name: string;
  avatarUrl: string;
  notes: string;
  tags: Array<{
    tag: Omit<Tag, 'parent' | 'children'>;
  }>;
  resolved: boolean;
  assignedTo?: AssignedTo;
  status: ContactStatus;
}
