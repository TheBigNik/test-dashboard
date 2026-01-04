import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/models/Products';

interface ProductState {
  recentlyViewed: Product[];
}

const initialState: ProductState = {
  recentlyViewed: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addRecentlyViewed: (state, action: PayloadAction<Product>) => {
      // Remove if exists to avoid duplicates, then add to front
      const filtered = state.recentlyViewed.filter(p => p.id !== action.payload.id);
      state.recentlyViewed = [action.payload, ...filtered].slice(0, 5); // Keep last 5
    },
  },
});

export const { addRecentlyViewed } = productSlice.actions;
export default productSlice.reducer;