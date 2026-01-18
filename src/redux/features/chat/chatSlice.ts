import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState } from '../../../types';

const initialState: ChatState = {
  myConnections: [],
  activeConnections: [],
  userProfile: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMyConnections: (
      state,
      action: PayloadAction<ChatState['myConnections']>
    ) => {
      state.myConnections = action.payload;
    },

    setActiveConnections: (
      state,
      action: PayloadAction<ChatState['activeConnections']>
    ) => {
      state.activeConnections = action.payload;
    },

    //set currently logged In user data to avoid fetching multiple times for chat activities
    setUserProfile: (
      state,
      action: PayloadAction<ChatState['userProfile']>
    ) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setActiveConnections, setMyConnections, setUserProfile } =
  chatSlice.actions;

export default chatSlice.reducer;
