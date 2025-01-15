import { configureStore } from '@reduxjs/toolkit';
import loggedInUserReducer from '../features/loggedInUser/userSlice';
import baseApi from '../api/baseApi';

const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
