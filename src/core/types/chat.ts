export interface ChatsCount {
  assigned: number;
  unassigned: number;
}

export interface Chat {
  id: number;
  contact: {
    id: number;
    name: string;
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
