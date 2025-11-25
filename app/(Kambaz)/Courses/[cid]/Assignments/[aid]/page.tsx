/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormLabel, Row, Col, FormCheck, FormSelect, Button } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { InputGroup } from "react-bootstrap";
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/Form";
import { BiCalendar } from "react-icons/bi";
import { useParams } from "next/navigation";
//import * as db from "../../../../Database";
import { formatDateString } from "../FormatDateString";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {addAssignment, deleteAssignment, setAssignments, updateAssignment} from "../reducer";
import {useEffect, useState} from "react";
import * as client from "../client";

export default function AssignmentEditor() {
    const { cid } = useParams();
    const { aid } = useParams();
    const [assignment, setAssignment] = useState<any>(null);
    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const existingAssignment = assignments.find((a: any) => a._id === aid);
    const dispatch = useDispatch();
    useEffect(() => {
        if (existingAssignment) {
            setAssignment(existingAssignment);
        } else {
            setAssignment({
                _id: "",
                title: "New Assignment",
                description: "",
                points: 0,
                course: cid,
                availableDate: "2023-09-10",
                dueDate: "2023-12-15"
            });
        }
    }, [existingAssignment, cid]);


    const availableDateFormatted = formatDateString(assignment?.availableDate);
    const dueDateFormatted = formatDateString(assignment?.dueDate);
    const onUpdateAssignment = async (assignment: any) => {
        await client.updateAssignment(cid as string, assignment);
        const newAssignments = assignments.map((a: any) => a._id === assignment._id ? assignment : a );
        dispatch(setAssignments(newAssignments));
    };
    const onCreateAssignmentForCourse = async () => {
        if (!cid) return;
        const newAssignment = { ...assignment, course: cid };
        const createdAssignment = await client.createAssignmentForCourse(cid, newAssignment);
        dispatch(setAssignments([...assignments, createdAssignment]));
    };

    const handleSave = async () => {
        if (existingAssignment) {
            console.log(assignment._id)
            await onUpdateAssignment(assignment);
        } else {
            await onCreateAssignmentForCourse();
        }
    }


    return (
        <div id="wd-assignments-editor" className='p-2'>
            <FormLabel>Assignment Name</FormLabel>
            <FormControl defaultValue={assignment?.title}
             onChange={(e) => setAssignment({ ...assignment, title: e.target.value }) }/>
            <br />
            <FormControl as="textarea" rows={4}
             onChange={(e) => setAssignment({ ...assignment, description: e.target.value }) }>
                {assignment?.description} 
            </FormControl>
            <br />

            <Form>
                    <Row className="mb-3" controlId="wd-points">
                        <FormLabel column sm={2}> Points </FormLabel>
                        <Col sm={10}> <FormControl defaultValue={assignment?.points}
                        onChange={(e) => setAssignment({ ...assignment, points: e.target.value }) }/> </Col>
                    </Row>
                    <Row className="mb-3" controlId="wd-group">
                        <FormLabel column sm={2}> Assignment Group </FormLabel>
                        <Col sm={10}> 
                            <FormSelect>
                                <option value="0" defaultChecked>ASSIGNMENTS</option>
                            </FormSelect>
                         </Col>
                    </Row>
                    <Row className="mb-3" controlId="wd-display-grade-as">
                        <FormLabel column sm={2}> Display Grade as </FormLabel>
                        <Col sm={10}> 
                            <FormSelect>
                                <option value="0" defaultChecked>Percentage</option>
                            </FormSelect>
                         </Col>
                    </Row>
                    <Row className="mb-3" controlId="wd-group">
                        <FormLabel column sm={2}> Submission Type </FormLabel>
                        <Col sm={10}> 
                        <div className="border border-1  p-3">
                            <FormSelect>
                                <option value="0" defaultChecked>Online</option>
                            </FormSelect>
                            <br/>
                            <FormLabel> <strong>Online Entry Options</strong></FormLabel>
                            <Form.Check 
                                type="checkbox"     
                                id="wd-submission-type"
                                label="Text Entry"  
                                defaultChecked={false}        
                            />
                            <Form.Check 
                                type="checkbox"     
                                id="wd-submission-type"
                                label="Website URL"  
                                defaultChecked={false}        
                            />
                            <Form.Check 
                                type="checkbox"     
                                id="wd-submission-type"
                                label="Media Recordings"  
                                defaultChecked={false}        
                            />
                            <Form.Check 
                                type="checkbox"     
                                id="wd-submission-type"
                                label="Student Annotation"  
                                defaultChecked={false}        
                            />
                            <Form.Check 
                                type="checkbox"     
                                id="wd-submission-type"
                                label="File Uploads"  
                                defaultChecked={false}        
                            />
                            </div>
                         </Col>
                    </Row>
                    <Row className="mb-3" controlId="wd-assign-to">
                        <FormLabel column sm={2}> Assign </FormLabel>
                        <Col sm={10}> 
                        <div className="border border-1  p-3">
                            <FormLabel><strong>Assign to</strong></FormLabel>
                            <InputGroup>
                                <InputGroupText>Everyone<span className='ms-3'>X</span></InputGroupText>
                                <FormControl />
                             </InputGroup>
                             <br/>
                             <FormLabel><strong>Due</strong></FormLabel>
                            <InputGroup>
                                <FormControl type='date' defaultValue={dueDateFormatted} 
                                onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value }) }/>
                                <InputGroupText><BiCalendar className="fs-4"/></InputGroupText>
                             </InputGroup>
                             <br/>
                             <Row className="g-3">
                             <Col md={6}>
                                <FormLabel><strong>Available from</strong></FormLabel>
                                <InputGroup>
                                <FormControl 
                                onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value }) }
                                type='date' defaultValue={availableDateFormatted} />
                                <InputGroupText>
                                    <BiCalendar className="fs-4" />
                                </InputGroupText>
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <FormLabel><strong>Until</strong></FormLabel>
                                <InputGroup>
                                <FormControl type='date'/>
                                <InputGroupText>
                                    <BiCalendar className="fs-4" />
                                </InputGroupText>
                                </InputGroup>
                            </Col>
                            </Row>
                        </div>
                        </Col>
                    </Row> 
                    </Form>
                <hr />
                
                <div className='d-flex justify-content-end gap-1'>
                    <Link href={`/Courses/${cid}/Assignments/`}>
                         <Button variant="secondary">Cancel</Button>
                     </Link>
                    <Link href={`/Courses/${cid}/Assignments/`}>
                        <Button onClick={handleSave} variant="danger" className="me-2">
                            Save</Button>
                    </Link>
                
            
                </div>

        </div>
    );
}
