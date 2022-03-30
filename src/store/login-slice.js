import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    email: '',
  },
  reducers: {
    login(state, action) {
      state.isLogin = true;
    },
    logout(state, action) {
      state.isLogin = false;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
