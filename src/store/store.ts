import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat';
import historyReducer from '@/store/history';

export const store = configureStore({
  reducer: {
    chatSlice: chatReducer,
    historySlice: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

