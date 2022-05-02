import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import chat from './features/chat';
import chats from './features/chat-list';

export function makeStore() {
  return configureStore({
    reducer: {
      chat,
      chats,
    },
  });
}

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
