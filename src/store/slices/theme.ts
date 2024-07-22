import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CONSTANTS } from '../../helper/constants'

export interface ThemeState {
  value: string
}

const initialState: ThemeState = {
  value: CONSTANTS.DARK,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
