import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});

export default store;