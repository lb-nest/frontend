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
  resolved: boolean;
  assignedTo?: AssignedTo;
  status: ContactStatus;
}
