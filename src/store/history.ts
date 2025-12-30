import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Message } from '@/store/chat'

export type ChatHistory = {
  id: string
  title: string
  messages: Message[]
  createdAt: string
}

interface HistoryState {
  histories: ChatHistory[]
}

const initialState: HistoryState = {
  histories: [],
}

const historySlice = createSlice({
  name: 'historySlice',
  initialState,
  reducers: {
    addHistory(state, action: PayloadAction<ChatHistory>) {
      state.histories.push(action.payload)
    },
    removeHistory(state, action: PayloadAction<string>) {
      state.histories = state.histories.filter(h => h.id !== action.payload)
    },
    clearHistories(state) {
      state.histories = []
    },
    setHistories(state, action: PayloadAction<ChatHistory[]>) {
      state.histories = action.payload
    },
  },
})

export const { addHistory, removeHistory, clearHistories, setHistories } = historySlice.actions
export default historySlice.reducer