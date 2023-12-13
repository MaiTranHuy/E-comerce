import { createSlice } from '@reduxjs/toolkit'
import { getNewProduct } from './asyncActions'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    newProducts: null,
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewProduct.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(getNewProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.newProducts = action.payload
    })

    builder.addCase(getNewProduct.rejected, (state, action) => {
      state.isLoading = false
      //   state.errorMessage = action.payload.message
    })
  }
})

// export const { } = productSlice.actions;
export default productSlice.reducer
