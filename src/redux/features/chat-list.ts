import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '../store';

export interface ChatListState {
  items: any[];
  type: string;
}

const initialState: ChatListState = {
  items: [],
  type: 'assigned',
};

export const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  },
});

export const { setType } = chatListSlice.actions;

export const selectChatList = (state: AppState) => state.chatList;

export default chatListSlice.reducer;
