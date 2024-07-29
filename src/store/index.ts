import { configureStore } from '@reduxjs/toolkit'
import { themeSlice, tabSlice, modalSlice } from './slices'
import { fileApi } from '../api/file'

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    tab: tabSlice,
    modal: modalSlice,
    [fileApi.reducerPath]: fileApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fileApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
