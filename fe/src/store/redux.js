import { configureStore } from '@reduxjs/toolkit'
import appSlice from './app/appSlice'
import productSlice from './products/productSlice'
import storage from 'redux-persist/lib/storage'
import userSlice from './user/userSlice'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const commonConfig = {
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token','current']   //luu tru cac du lieu nay o local
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    product: productSlice,
    user: persistReducer(userConfig, userSlice) //persist dung de luu vao local
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)
