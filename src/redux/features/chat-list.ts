import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, ChatsCount } from '../../core/types';
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

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<ChatsCount>) => {
      state.count = action.payload;
    },
    setType: (state, action: PayloadAction<number>) => {
      state.type = action.payload;
    },
    pushItems: (state, action: PayloadAction<Chat[]>) => {
      state.items = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { setCount, setType, pushItems, clearItems } = chatsSlice.actions;

export const selectChats = (state: AppState) => state.chats.items;
export const selectType = (state: AppState) => state.chats.type;
export const selectChatsCount = (state: AppState) => state.chats.count;

export default chatsSlice.reducer;
