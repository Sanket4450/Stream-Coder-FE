import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TabState {
  value: null | string
}

const initialState: TabState = {
  value: null,
}

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    clearTab: (state) => {
      state.value = null
    },
  },
})

export const { setTab, clearTab } = tabSlice.actions

export default tabSlice.reducer
