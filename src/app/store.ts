import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import { efoodApi } from '../features/api/efoodApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [efoodApi.reducerPath]: efoodApi.reducer
  },
  middleware: (getDefault) => getDefault().concat(efoodApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
