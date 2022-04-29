import { ContactStatus } from './contact';

export interface ChatsCount {
  assigned: number;
  unassigned: number;
}

export interface Chat {
  id: number;
  contact: {
    id: number;
    username: string;
    name: string;
    avatarUrl: string;
    assignedTo?: {
      id: number;
      name: string;
    };
    status: ContactStatus;
  };
  messages: Array<{
    id: number;
    fromMe: boolean;
    content: Array<{
      text: string;
    }>;
    createdAt: number;
    updatedAt: number;
  }>;
}
