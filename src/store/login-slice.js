import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    email: '',
    image: '',
  },
  reducers: {
    login(state, action) {
      state.isLogin = true;
    },
    logout(state, action) {
      state.isLogin = false;
      state.email = '';
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setImage(state, action) {
      state.image = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
