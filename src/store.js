import { configureStore } from '@reduxjs/toolkit';
import personsReducer from './features/personsSlice';

export default configureStore({
  reducer: {
    persons: personsReducer,
  },
});