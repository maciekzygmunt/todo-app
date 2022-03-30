import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
      if (!action.payload.isLogin) {
        state.todos = [...state.todos, action.payload.todo];
      }
      if (action.payload.isLogin) {
        const sendTodo = async () => {
          const response = await fetch(
            `https://to-do-app-ccb69-default-rtdb.europe-west1.firebasedatabase.app/${action.payload.email}.json`,
            {
              method: 'POST',
              body: JSON.stringify({
                id: action.payload.todo.id,
                title: action.payload.todo.title,
                isChecked: action.payload.todo.isChecked,
              }),
            }
          );
        };
        sendTodo();
        state.todos = [...state.todos, action.payload.todo];
      }
    },
    removeTodo(state, action) {
      if (!action.payload.isLogin) {
        let filteredTodos = state.todos.filter((todo) => {
          return todo.id !== action.payload.id;
        });
        state.todos = filteredTodos;
      }
      if (action.payload.isLogin) {
        const removeTodo = async () => {
          const response = await fetch(
            `https://to-do-app-ccb69-default-rtdb.europe-west1.firebasedatabase.app/${action.payload.email}/${action.payload.fbkey}.json`,
            {
              method: 'DELETE',
            }
          );
          console.log(response);
        };
        removeTodo();
        let filteredTodos = state.todos.filter((todo) => {
          return todo.fbkey !== action.payload.fbkey;
        });
        state.todos = filteredTodos;
      }
    },
    setTodos(state, action) {
      state.todos = action.payload;
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;
