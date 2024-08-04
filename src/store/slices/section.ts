import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SectionState {
  editor: boolean
  tab: boolean
}

const initialState: SectionState = {
  editor: true,
  tab: false,
}

const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    openTabSection: (state) => {
      state.editor = false
      state.tab = true
    },
    closeTabSection: (state) => {
      state.tab = false
      state.editor = true
    },
  },
})

export const { openTabSection, closeTabSection } = sectionSlice.actions

export default sectionSlice.reducer
