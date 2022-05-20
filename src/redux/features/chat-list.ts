import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, ChatsCount, ContactStatus } from '../../core/types';
import type { AppState } from '../store';

export interface ChatsState {
  count: ChatsCount;
  items: Chat[];
  type: number;
}

const initialState: ChatsState = {
  count: {
    assigned: 0,
    unassigned: 0,
  },
  items: [],
  type: 1,
};

const toType = (chat: Chat) => {
  if (chat.contact.status === ContactStatus.Closed) {
    return 2;
  }

  return chat.contact.assignedTo == null ? 1 : 0;
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatsCount: (state, action: PayloadAction<ChatsCount>) => {
      state.count = action.payload;
    },
    setType: (state, action: PayloadAction<number>) => {
      state.type = action.payload;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.items = action.payload;
    },
    handleReceived: (state, action: PayloadAction<Chat>) => {
      if (!~state.type) {
        return;
      }

      const index = state.items.findIndex((item) => action.payload.id === item.id);
      if (~index) {
        state.items.splice(index, 1);
      }

      const type = toType(action.payload);
      if (state.type === type) {
        state.items.unshift(action.payload);
      }
    },
    clearChats: (state) => {
      state.items = [];
    },
  },
});

export const { setChatsCount, setType, setChats, handleReceived, clearChats } = chatsSlice.actions;

export const selectChats = (state: AppState) => state.chats.items;
export const selectType = (state: AppState) => state.chats.type;
export const selectChatsCount = (state: AppState) => state.chats.count;

export default chatsSlice.reducer;
