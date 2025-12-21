import { configureStore } from '@reduxjs/toolkit';
import chatSliceReducer from './chat';
export const store = configureStore({
  reducer: {
    chatSlice: chatSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

