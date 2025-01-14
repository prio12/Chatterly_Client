import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../../firebase/firebase.cofig';

const initialState = {
  currentUser: null,
  isLoading: true,
  isError: false,
  error: '',
};

//create async thunk to create user with email pass
export const createUserWithEmail = createAsyncThunk(
  'createUser/withEmailPass',
  async ({ email, password }) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      currentUser: response.user.uid,
    };
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(createUserWithEmail.pending, (state) => {
        (state.currentUser = null),
          (state.isLoading = true),
          (state.isError = false),
          (state.error = '');
      })
      .addCase(createUserWithEmail.fulfilled, (state, { payload }) => {
        (state.currentUser = payload.currentUser),
          (state.isLoading = false),
          (state.isError = false),
          (state.error = '');
      })
      .addCase(createUserWithEmail.rejected, (state, action) => {
        (state.currentUser = null),
          (state.isLoading = false),
          (state.isError = true),
          (state.error = action.error.message);
      });
  },
});

export const { setUser, toggleLoading } = userSlice.actions;

export default userSlice.reducer;
