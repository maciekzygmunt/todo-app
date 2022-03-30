import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';

function ToDoList() {
  const todos = useSelector((state) => state.todo.todos);

  return (
    <div>
      {todos.map((todo, i) => (
        <ToDoItem key={i} id={todo.id} title={todo.title} isChecked={todo.isChecked} />
      ))}
    </div>
  );
}
export default ToDoList;
