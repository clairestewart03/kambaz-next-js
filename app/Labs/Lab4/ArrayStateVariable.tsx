import { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";

export default function ArrayStateVariable() {
 const { todos } = useSelector((state: any) => state.todosReducer);
 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };
const deleteElement = (index: number) => {
   setArray(array.filter((item, i) => i !== index));
 };
 return (
    <div id="wd-array-state-variables">
  <ListGroup>
    <ListGroupItem>
      <h2>Array State Variable</h2>
      <Button variant='success' onClick={addElement}>Add Element</Button>
    </ListGroupItem>
    {array.map((item, index) => (
      <ListGroupItem key={index}>
        <Row>
          <Col>
            {item}
          </Col>
          <Col>
            <Button variant='danger' onClick={() => deleteElement(index)}>
              Delete
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    ))}
  </ListGroup>
  <hr/>
  <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
 


</div>
);
   }
   



