import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo, }: {
    todo: { id: string; title: string };
  }) {
    const dispatch = useDispatch();
    return (
      <ListGroupItem className='d-flex align-items-center justify-content-between' key={todo.id}>
        {todo.title}
        <div className='ms-auto'>
        <Button className='me-2' onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"> Edit </Button>
        <Button className='me-2' variant='danger' onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"> Delete </Button>
                </div>
         </ListGroupItem>);}
  
  