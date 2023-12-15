import { createSlice } from '@reduxjs/toolkit'
import * as action from './asyncAction'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
    },
    logout: (state, action) => {
      state.isLoggedIn = false
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(action.getCurrent.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(action.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false
      state.current = action.payload
    })

    builder.addCase(action.getCurrent.rejected, (state, action) => {
      state.isLoading = false
      state.current = null
    })
  }
})

export const { login,logout } = userSlice.actions
export default userSlice.reducer
