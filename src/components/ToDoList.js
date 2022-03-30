import { useSelector } from 'react-redux';
import ToDoItem from './ToDoItem';

function ToDoList() {
  const todos = useSelector((state) => state.todo.todos);

  return (
    <div>
      {todos.map((todo, i) => (
        <ToDoItem key={i} fbkey={todo.fbkey} title={todo.title} isChecked={todo.isChecked} />
      ))}
    </div>
  );
}
export default ToDoList;
