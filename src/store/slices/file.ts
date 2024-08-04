import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FileState {
  activeFile: null | number
  selectedFiles: number[]
}

const initialState: FileState = {
  activeFile: null,
  selectedFiles: [],
}

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setActiveFile: (state, action: PayloadAction<null | number>) => {
      state.activeFile = action.payload
    },
    setSelectedFiles: (state, action: PayloadAction<number[]>) => {
      state.selectedFiles = action.payload
    },
  },
})

export const { setActiveFile, setSelectedFiles } = fileSlice.actions

export default fileSlice.reducer
