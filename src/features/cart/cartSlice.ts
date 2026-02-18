import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../api/types'

type CartItem = Product & { restaurantId: number; qty: number }
type CartState = { items: CartItem[] }

const initialState: CartState = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; restaurantId: number }>) => {
      const { product, restaurantId } = action.payload
      const existing = state.items.find((i) => i.id === product.id)
      if (existing) existing.qty += 1
      else state.items.push({ ...product, restaurantId, qty: 1 })
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      const existing = state.items.find((i) => i.id === action.payload)
      if (!existing) return
      if (existing.qty > 1) existing.qty -= 1
      else state.items = state.items.filter((i) => i.id !== action.payload)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    clearCart: (state) => { state.items = [] }
  }
})

export const { addItem, decrementItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
