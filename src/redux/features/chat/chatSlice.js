import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myConnections: [],
  activeConnections: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMyConnections: (state, { payload }) => {
      console.log(payload, 'in chatSlice');
      state.myConnections = payload;
    },

    setActiveConnections: (state, { payload }) => {
      state.activeConnections = payload;
    },
  },
});

export const { setActiveConnections, setMyConnections } = chatSlice.actions;

export default chatSlice.reducer;
