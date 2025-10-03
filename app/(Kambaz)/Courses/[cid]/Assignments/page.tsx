import Link from "next/link";
import { Button, ListGroup, ListGroupItem, InputGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { TbFilePencil } from "react-icons/tb";
import AssignmentDescriptionButtons from "./AssignmentDescriptionButtons";
import { FaMagnifyingGlass } from "react-icons/fa6";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export default function Assignments() {
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
           
            <Button variant="danger" id="wd-add-assignment">
                + Assignment</Button>
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
                <ListGroup className="wd-assignment-list-item rounded-0">
                    <ListGroupItem className="wd-assignment-description p-3 ps-1 d-flex">
                        <BsGripVertical className="me-2 fs-3" />
                        <TbFilePencil className="me-2 fs-3" color="green" />
                         <p id='wd-assignment-description' className='mb-0 small'>
                        <span className='fs-6'>
                            <Link href='/Courses/1234/Assignments/1'
                            className='text-decoration-none text-reset'>
                                <strong>A1</strong> <br /></Link></span>
                        <span className='text-danger'>Multiple Modules </span> | <strong>Not available until</strong> May 6 at 12:00am |
                        <strong> <br /> Due</strong> May 13 at 11:59pm | 100 pts</p>
                    <div className='ms-auto d-flex align-items-center'>
                    <AssignmentDescriptionButtons />
                    </div>
                    </ListGroupItem>
                </ListGroup>

                <ListGroup className="wd-assignment-list-item rounded-0">
                    <ListGroupItem className="wd-assignment-description p-3 ps-1 d-flex">
                        <BsGripVertical className="me-2 fs-3" />
                        <TbFilePencil className="me-2 fs-3" color="green" />
                         <p id='wd-assignment-description' className='mb-0 small'>
                        <span className='fs-6'>
                        <Link href='/Courses/1234/Assignments/2'
                            className='text-decoration-none text-reset'>
                                <strong>A2</strong> <br /></Link></span>
                        <span className='text-danger'>Multiple Modules </span> | <strong>Not available until</strong> May 13 at 12:00am |
                        <strong> <br /> Due</strong> May 20 at 11:59pm | 100 pts</p>
                    <div className='ms-auto d-flex align-items-center'>
                    <AssignmentDescriptionButtons />
                    </div>
                    </ListGroupItem>
                </ListGroup>

                <ListGroup className="wd-assignment-list-item rounded-0">
                    <ListGroupItem className="wd-assignment-description p-3 ps-1 d-flex">
                        <BsGripVertical className="me-2 fs-3" />
                        <TbFilePencil className="me-2 fs-3" color="green" />
                         <p id='wd-assignment-description' className='mb-0 small'>
                        <span className='fs-6'>
                        <Link href='/Courses/1234/Assignments/3'
                            className='text-decoration-none text-reset'>
                                <strong>A3</strong> <br /></Link></span>
                        <span className='text-danger'>Multiple Modules </span> | <strong>Not available until</strong> May 20 at 12:00am |
                        <strong> <br /> Due</strong> May 27 at 11:59pm | 100 pts</p>
                    <div className='ms-auto d-flex align-items-center'>
                    <AssignmentDescriptionButtons />
                    </div>
                    </ListGroupItem>
                </ListGroup>
        </ListGroup>
        </div>
    );}
