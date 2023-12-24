import { createSlice } from '@reduxjs/toolkit'
import * as action from './asyncAction'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false,
    message: ''
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
    },
    logout: (state, action) => {
      state.isLoggedIn = false
      state.token = null
      state.current = null
      state.isLoading = false
      state.message = ''
    },
    clearMessage: (state) => {
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(action.getCurrent.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(action.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false
      state.current = action.payload
      state.isLoggedIn = true
    })

    builder.addCase(action.getCurrent.rejected, (state, action) => {
      state.isLoading = false
      state.current = null
      state.isLoggedIn = false
      state.token = null
      state.message = 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại!'
    })
  }
})

export const { login, logout,clearMessage } = userSlice.actions
export default userSlice.reducer
