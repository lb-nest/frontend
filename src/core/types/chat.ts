import { Contact } from './contact';
import { Message } from './message';

export interface ChatsCount {
  assigned: number;
  unassigned: number;
}

export interface Chat {
  channelId: number | null;
  accountId: string;
  contact: Contact;
  messages: Message[];
  unreadCount: number;
}
