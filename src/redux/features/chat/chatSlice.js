import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myConnections: [],
  activeConnections: [],
  userProfile: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMyConnections: (state, { payload }) => {
      state.myConnections = payload;
    },

    setActiveConnections: (state, { payload }) => {
      state.activeConnections = payload;
    },

    //set currently logged In user data to avoid fetching multiple times for chat activities
    setUserProfile: (state, { payload }) => {
      state.userProfile = { payload };
    },
  },
});

export const { setActiveConnections, setMyConnections, setUserProfile } =
  chatSlice.actions;

export default chatSlice.reducer;
