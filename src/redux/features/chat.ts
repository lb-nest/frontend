import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat } from '../../core/types';
import { AppState } from '../store';

export interface ChatState {
  chat?: Omit<Chat, 'messages'>;
}

const initialState: ChatState = {
  chat: undefined,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<Omit<Chat, 'messages'>>) => {
      state.chat = action.payload;
    },
  },
});

export const { setChat } = chatSlice.actions;

export const selectChat = (state: AppState) => state.chat.chat;

export default chatSlice.reducer;
