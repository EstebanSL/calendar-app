import { createSlice } from '@reduxjs/toolkit';
import { UserAuth } from '../../interfaces/UserAuth';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInformation: localStorage.getItem('USER') ? JSON.parse(localStorage.getItem('USER') || '{}') : null
  },
  reducers: {
    setUserData: (state, {payload} ) => {
      state.userInformation = payload;
      localStorage.setItem('USER', JSON.stringify(payload))
    },
    deleteUserData: (state) => {
      state.userInformation = null;
      localStorage.removeItem('USER')
    }
  }
});


export const { setUserData, deleteUserData } = userSlice.actions;