import React, { useEffect } from 'react';
import './App.css';
import Header from './layout/Header';
import DemoAlert from './components/DemoAlert';
import { useSelector, useDispatch } from 'react-redux';
import AddButton from './layout/AddButton';
import ToDoList from './components/ToDoList';
import { todoActions } from './store/todo-slice';

function App() {
  const isLogin = useSelector((state) => state.login.isLogin);
  const email = useSelector((state) => state.login.email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      dispatch(
        todoActions.addTodo({
          todo: { id: 1, title: 'Demo TODO', isChecked: false },
          isLogin,
          email: '',
        })
      );
    }
  }, [isLogin, dispatch]);

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(
        `https://to-do-app-ccb69-default-rtdb.europe-west1.firebasedatabase.app/${email}.json`
      );
      const data = await response.json();
      const transformedTodos = [];
      for (const key in data) {
        const todoObj = {
          fbkey: key,
          ...data[key],
        };
        transformedTodos.push(todoObj);
      }
      dispatch(todoActions.setTodos(transformedTodos));
    };
    if (isLogin) {
      getTodos();
      dispatch(todoActions.removeTodo({ id: 1, isLogin: false }));
    }
  }, [isLogin, email, dispatch]);

  return (
    <>
      <Header />
      {!isLogin && <DemoAlert />}
      <ToDoList />
      <AddButton />
    </>
  );
}

export default App;
