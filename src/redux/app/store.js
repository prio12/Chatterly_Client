import { configureStore } from '@reduxjs/toolkit';
import loggedInUserReducer from '../features/loggedInUser/userSlice';

const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
  },
});

export default store;
