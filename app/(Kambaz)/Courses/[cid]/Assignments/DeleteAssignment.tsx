import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function DeleteAssignment({ show, handleClose, assignmentId
}: { show: boolean; handleClose: () => void; assignmentId: string;
}) {
  const dispatch = useDispatch();
  const handleDelete = (assignmentId: string) => {
    dispatch(deleteAssignment(assignmentId)); 
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this assignment?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDelete(assignmentId);
            handleClose(); 
          }}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

