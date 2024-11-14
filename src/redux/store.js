import { configureStore } from '@reduxjs/toolkit';
import recommendationsReducer from './recommendationsSlice';

const store = configureStore({
  reducer: {
    recommendations: recommendationsReducer,
  },
});

export default store;