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
  }, []);

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
