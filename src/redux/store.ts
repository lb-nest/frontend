import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import chatList from './features/chat-list';

export function makeStore() {
  return configureStore({
    reducer: {
      chatList,
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
