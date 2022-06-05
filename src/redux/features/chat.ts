import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, Message } from '../../core/types';
import { AppState } from '../store';

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
    setIdAndContact: (state, action: PayloadAction<Pick<Chat, 'id' | 'contact'>>) => {
      state.id = action.payload.id;
      state.contact = action.payload.contact;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    handleReceived: (state, action: PayloadAction<Message>) => {
      const index = state.messages?.findIndex(({ id }) => id === action.payload.id);
      if (~index) {
        state.messages[index] = action.payload;
      } else {
        if (state.messages.length === 0 || action.payload.id > state.messages.at(-1)?.id) {
          state.messages.unshift(action.payload);
        }
      }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { setIdAndContact, setMessages, handleReceived, clearMessages } = chatSlice.actions;

export const selectChat = (state: AppState) => state.chat;

export default chatSlice.reducer;
