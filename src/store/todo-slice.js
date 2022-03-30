import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todos = [...state.todos, action.payload.todo];
    },
    removeTodo(state, action) {
      let filteredTodos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });
      state.todos = filteredTodos;
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;
