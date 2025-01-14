import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import auth from '../../../firebase/firebase.cofig';
import { GoogleAuthProvider } from 'firebase/auth';

const initialState = {
  currentUser: null,
  isLoading: true,
  isError: false,
  error: '',
};

// async thunk to create user with email pass
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

//async thunk to create user with google provider
export const createUserWithGoogle = createAsyncThunk(
  'createUser/withGoogle',
  async () => {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    return {
      currentUser: response.user,
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
      })
      .addCase(createUserWithGoogle.pending, (state) => {
        (state.currentUser = null),
          (state.isLoading = true),
          (state.isError = false),
          (state.error = '');
      })
      .addCase(createUserWithGoogle.fulfilled, (state, { payload }) => {
        (state.currentUser = payload.currentUser.uid),
          (state.isLoading = true),
          (state.isError = false),
          (state.error = '');
      })
      .addCase(createUserWithGoogle.rejected, (state, action) => {
        (state.currentUser = null),
          (state.isLoading = true),
          (state.isError = false),
          (state.error = action.error.message);
      });
  },
});

export const { setUser, toggleLoading } = userSlice.actions;

export default userSlice.reducer;
