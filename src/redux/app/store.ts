import { configureStore } from '@reduxjs/toolkit';
import loggedInUserReducer from '../features/loggedInUser/userSlice';
import chatReducer from '../features/chat/chatSlice';
import baseApi from '../api/baseApi';

const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    chat: chatReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
