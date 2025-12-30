import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const initialMessage: Message = {
  id: '1',
  role: 'assistant',
  content: "Hello! I'm Rebound AI. How can I help you today?",
  timestamp: new Date(),
}

interface ChatState {
  messages: Message[]
  initialPrompt: string | null
}

const initialState: ChatState = {
  messages: [initialMessage],
  initialPrompt: null,
}

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload)
    },
    resetChat(state) {
      state.messages = [initialMessage]
    },
    setInitialPrompt(state, action: PayloadAction<string | null>) {
      state.initialPrompt = action.payload
    },
    clearInitialPrompt(state) {
      state.initialPrompt = null
    },
  },
})

export const { setMessages, addMessage, resetChat, setInitialPrompt, clearInitialPrompt } = chatSlice.actions
export default chatSlice.reducer