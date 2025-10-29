/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";
import Link from "next/link";
import { Button, ListGroup, ListGroupItem, InputGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { TbFilePencil } from "react-icons/tb";
import AssignmentDescriptionButtons from "./AssignmentDescriptionButtons";
import { FaMagnifyingGlass } from "react-icons/fa6";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import FormatDate from "./FormatDate";
import { useSelector } from "react-redux";
import { deleteModule } from "../Modules/reducer";
import { useDispatch } from "react-redux";
import DeleteAssignment from "./DeleteAssignment";

export default function Assignments() {
    const { cid } = useParams();
    const assignments = useSelector((state: any) => state.assignmentReducer.assignments);
    const dispatch = useDispatch();
    return (
        <div id="wd-assignments">
            <div className='d-flex align-items-center justify-content-between'>
            <InputGroup style={{width:"200px"}}>
                    <InputGroupText>
                        <FaMagnifyingGlass />
                    </InputGroupText>
                    <FormControl placeholder="Search..." id="wd-search-assignment" />
                </InputGroup>
            <div className='d-flex'>
             <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
                + Group</Button>
            <Link href={`/Courses/${cid}/Assignments/New-Assignment`}>
            <Button variant="danger" id="wd-add-assignment">
                + Assignment</Button>
            </Link>
                </div>
           
                </div>
            <br /><br />
            <ListGroup className='rounded-0' id='wd-assignments'>
                <ListGroupItem className='wd-assignment p-0 fs-5 border-gray'>
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="fs-3" /><GoTriangleDown className='me-2'/>
                     ASSIGNMENTS <AssignmentControlButtons />
                </div>
                </ListGroupItem> 

                <ListGroup id="wd-assignment-list-item" className="rounded-0">
                {assignments.filter((assignment: any) => assignment.course === cid).map((assignment: any) => (
            <ListGroupItem className="wd-assignment-description p-3 ps-1 d-flex">
                <BsGripVertical className="me-2 fs-3" />
                        <TbFilePencil className="me-2 fs-3" color="green" />
                         <p id='wd-assignment-description' className='mb-0 small'>
                        <span className='fs-6'>
                            <Link href={`/Courses/${cid}/Assignments/${assignment._id}`}
                            className='text-decoration-none text-reset'>
                                <strong>{assignment.title}</strong> <br /></Link></span>
                        <span className='text-danger'>Multiple Modules </span> | <strong>Not available until</strong> <FormatDate rawDate={assignment.availableDate}/> |
                        <strong> <br /> Due</strong> <FormatDate rawDate={assignment.dueDate}/> | {assignment.points} pts</p>
                    <div className='ms-auto d-flex align-items-center'>
                    <AssignmentDescriptionButtons 
                        assignmentId={assignment._id} 
                        deleteAssignment={(assignmentId) => {
                        dispatch(deleteModule(assignmentId));}} />
                    </div>
                    </ListGroupItem>
                    ))}
                </ListGroup>
        
        </ListGroup>
        </div>
    );}

  