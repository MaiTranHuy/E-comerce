import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    categories: null,
    brands:null,
    isLoading: false,
    isShowModal: false,
    modalChildren: null
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal
      state.modalChildren = action.payload.modalChildren
    }
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    })

    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload.message
    })

    builder.addCase(actions.getBrands.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(actions.getBrands.fulfilled, (state, action) => {
      state.isLoading = false
      state.brands = action.payload
    })

    builder.addCase(actions.getBrands.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload.message
    })

  }
})

export const { showModal} = appSlice.actions;
export default appSlice.reducer
