import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import deepEqual from 'deep-equal';
import { Chat, ChatsCount, ContactStatus } from '../../core/types';
import type { AppState } from '../store';

export interface ChatsState {
  type: 'assigned' | 'unassigned' | 'closed';
  items: Chat[];
  count: ChatsCount;
}

const initialState: ChatsState = {
  type: 'assigned',
  items: [],
  count: {
    assigned: 0,
    unassigned: 0,
  },
};

const toType = (chat: Chat): ChatsState['type'] => {
  if (chat.contact.status === ContactStatus.Closed) {
    return 'closed';
  }

  return chat.contact.assignedTo == null ? 'unassigned' : 'assigned';
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<ChatsState['type']>) => {
      state.type = action.payload;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.items = action.payload;
    },
    handleReceived: (state, action: PayloadAction<Chat>) => {
      if (!~state.type) {
        return;
      }

      const index = state.items.findIndex(
        (item) =>
          action.payload.channelId === item.channelId &&
          action.payload.accountId === item.accountId,
      );
      if (~index) {
        if (
          deepEqual(action.payload.contact, state.items[index].contact) &&
          !deepEqual(action.payload.messages, state.items[index].messages)
        ) {
          state.items[index] = action.payload;
          return;
        }

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

export const { setType, setChats, handleReceived, clearChats } = chatsSlice.actions;

export const selectChats = (state: AppState) => state.chats.items;
export const selectType = (state: AppState) => state.chats.type;

export default chatsSlice.reducer;
