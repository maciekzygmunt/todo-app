import { useSelector } from 'react-redux';
import ToDoItem from './ToDoItem';

function ToDoList() {
  const todos = useSelector((state) => state.todo.todos);

  return (
    <div>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          id={todo.id}
          fbkey={todo.fbkey}
          title={todo.title}
          isChecked={todo.isChecked}
        />
      ))}
    </div>
  );
}
export default ToDoList;
