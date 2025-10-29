import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import DeleteAssignment from "./DeleteAssignment";
import { useState } from "react";
export default function AssignmentDescriptionButtons({ assignmentId, deleteAssignment }: { assignmentId: string; 
  deleteAssignment: (assignmentId: string) => void; }
) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="float-end">
      <FaTrash className='me-2 text-danger'
        onClick={handleShow}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <DeleteAssignment show={show} handleClose={handleClose} assignmentId={assignmentId}/>
    </div> );}