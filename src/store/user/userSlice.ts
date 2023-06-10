import { createSlice } from '@reduxjs/toolkit';
import { UserAuth } from '../../interfaces/UserAuth';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInformation: null
  },
  reducers: {
    setUserData: (state, {payload} ) => {
      state.userInformation = payload.session;
    },
    deleteUserData: (state) => {
      state.userInformation = null;
    }
  }
});


export const { setUserData, deleteUserData } = userSlice.actions;