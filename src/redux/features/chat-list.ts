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
    handleReceived: (state, action: PayloadAction<Chat>) => {
      if (!~state.type) {
        return;
      }

      const counter = Object.keys(state.count)[state.type];

      const index = state.items.findIndex((item) => action.payload.id === item.id);
      if (~index) {
        const flag =
          action.payload.contact.assignedTo?.id !== state.items[index].contact.assignedTo?.id ||
          action.payload.contact.status !== state.items[index].contact.status;

        state.items.splice(index, 1);

        if (flag) {
          state.count[counter] -= 1;
          return;
        }
      } else {
        state.count[counter] += 1;
      }

      state.items.unshift(action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { setCount, setType, pushItems, handleReceived, clearItems } = chatsSlice.actions;

export const selectChats = (state: AppState) => state.chats.items;
export const selectType = (state: AppState) => state.chats.type;
export const selectChatsCount = (state: AppState) => state.chats.count;

export default chatsSlice.reducer;
