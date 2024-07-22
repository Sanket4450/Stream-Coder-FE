import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmptyObj } from '../../interfaces/common'

export interface ModalState {
  deleteFile: EmptyObj
}

const initialState: ModalState = {
  deleteFile: { open: false, data: null },
}

const modalSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    openDeleteFileModal: (state, action: PayloadAction<any>) => {
      state.deleteFile = { open: true, data: action.payload }
    },

    closeDeleteFileModal: (state) => {
      state.deleteFile = { open: false, data: null }
    },
  },
})

export const { openDeleteFileModal, closeDeleteFileModal } = modalSlice.actions

export default modalSlice.reducer
