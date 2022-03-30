import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './login-slice';
import todoSlice from './todo-slice';

const store = configureStore({
  reducer: { login: loginSlice.reducer, todo: todoSlice.reducer },
});
export default store;
