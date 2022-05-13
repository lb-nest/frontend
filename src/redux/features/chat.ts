import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, Message } from '../../core/types';
import { AppState } from '../store';
import deepEqual from 'deep-equal';

export interface ChatState extends Partial<Chat> {}

const initialState: ChatState = {
  id: undefined,
  contact: undefined,
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<Chat>) => {
      state.id = action.payload.id;
      state.contact = action.payload.contact;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    handleReceived: (state, action: PayloadAction<Chat>) => {
      if (!deepEqual(state.contact, action.payload.contact)) {
        state.contact = action.payload.contact;
      }

      action.payload.messages.forEach((message) => {
        const index = state.messages?.findIndex(({ id }) => id === message.id);
        if (~index) {
          state.messages[index] = message;
        } else {
          if (state.messages.length === 0 || message.id > state.messages.at(-1)?.id) {
            state.messages.unshift(message);
          }
        }
      });
    },
  },
});

export const { setChat, setMessages, handleReceived } = chatSlice.actions;

export const selectChat = (state: AppState) => state.chat;

export default chatSlice.reducer;
