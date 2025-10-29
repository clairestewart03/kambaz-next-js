/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */

import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { FormControl, Button, ListGroup } from "react-bootstrap";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useSelector } from "react-redux";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
            {todos.map((todo: any) => (
          <TodoItem todo={todo} />

        ))}
      </ListGroup><hr/>
</div>);}

