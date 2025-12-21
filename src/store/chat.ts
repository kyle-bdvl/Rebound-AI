import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface ChatState {
  initialPrompt: string
}

const initialState: ChatState = {
  initialPrompt: '',
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setInitialPrompt: (state, action: PayloadAction<string>) => {
      state.initialPrompt = action.payload
    },
    clearInitialPrompt: (state) => {
      state.initialPrompt = ''
    },
  },
})

export const { setInitialPrompt, clearInitialPrompt } = chatSlice.actions
export default chatSlice.reducer