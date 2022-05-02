import { Contact } from './contact';
import { Message } from './message';

export interface ChatsCount {
  assigned: number;
  unassigned: number;
}

export interface Chat {
  id: number;
  contact: Contact;
  messages: Message[];
}
