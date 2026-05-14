import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './ordersSlice';

export const store = configureStore({
  reducer: {
    orders: orderReducer,
  },
});
