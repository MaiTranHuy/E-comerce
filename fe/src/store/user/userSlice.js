import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null
  },
  reducers: {
    register: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.current = action.payload.userData
      state.token = action.payload.token
    }
  }
  //   extraReducers: (builder) => {
  //     builder.addCase(getNewuser.pending, (state) => {
  //       state.isLoading = true
  //     })

  //     builder.addCase(getNewuser.fulfilled, (state, action) => {
  //       state.isLoading = false
  //       state.newusers = action.payload
  //     })

  //     builder.addCase(getNewuser.rejected, (state, action) => {
  //       state.isLoading = false
  //       //   state.errorMessage = action.payload.message
  //     })
  //   }
})

export const { register } = userSlice.actions
export default userSlice.reducer
