import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import auth from '../../../firebase/firebase.cofig';
import { GoogleAuthProvider } from 'firebase/auth';
import { SignInFormData, UserState } from '../../../types';

const initialState:UserState = {
  currentUser: null,
  isLoading: true,
  isError: false,
  error: '',
};

// async thunk to create user with email pass
export const createUserWithEmail = createAsyncThunk<{currentUser: string}, SignInFormData>(
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

//async thunk to sign in a existing user with email and pass
export const signInUserWithEmail = createAsyncThunk <{currentUser: string},SignInFormData> (
  'signIn/withEmailPass',
  async ({ email, password }) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
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
    signOutUser: (state, { payload }) => {
      state.currentUser = payload;
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
          (state.error = action.error.message ?? null);
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
          (state.error = action.error.message ?? null);
      })
      .addCase(signInUserWithEmail.pending, (state) => {
        (state.currentUser = null),
          (state.isLoading = true),
          (state.isError = false),
          (state.error = '');
      })
      .addCase(signInUserWithEmail.fulfilled, (state, { payload }) => {
        (state.currentUser = payload.currentUser),
          (state.isLoading = false),
          (state.isError = false),
          (state.error = '');
      })
      .addCase(signInUserWithEmail.rejected, (state, action) => {
        (state.currentUser = null),
          (state.isLoading = false),
          (state.isError = true),
          (state.error = action.error.message ?? null);
      });
  },
});

export const { setUser, toggleLoading, signOutUser } = userSlice.actions;

export default userSlice.reducer;
