import { configureStore } from '@reduxjs/toolkit'
import { themeSlice, tabSlice, modalSlice } from './slices'

export const store = configureStore({
  reducer: { theme: themeSlice, tab: tabSlice, modal: modalSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
