import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoading: true,
  isError: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setUser, toggleLoading } = userSlice.actions;

export default userSlice.reducer;
