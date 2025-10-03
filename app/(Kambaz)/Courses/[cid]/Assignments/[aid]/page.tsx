import { FormLabel, Row, Col, FormCheck, FormSelect, Button } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { InputGroup } from "react-bootstrap";
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/Form";
import { BiCalendar } from "react-icons/bi";


export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className='p-2'>
            <FormLabel>Assignment Name</FormLabel>
            <InputGroupText>A1</InputGroupText>
            <br />
            <FormControl as="textarea" rows={4}>
                This assignment is available online. 
            </FormControl>
            <br />

            <Form>
                    <Row className="mb-3" controlId="wd-points">
                        <FormLabel column sm={2}> Points </FormLabel>
                        <Col sm={10}> <InputGroupText>100</InputGroupText> </Col>
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
                                <FormControl value='May 13, 2024, 11:59 PM'/>
                                <InputGroupText><BiCalendar className="fs-4"/></InputGroupText>
                             </InputGroup>
                             <br/>
                             <Row className="g-3">
                             <Col md={6}>
                                <FormLabel><strong>Available from</strong></FormLabel>
                                <InputGroup>
                                <FormControl value="May 13, 2024, 11:59 PM" />
                                <InputGroupText>
                                    <BiCalendar className="fs-4" />
                                </InputGroupText>
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <FormLabel><strong>Until</strong></FormLabel>
                                <InputGroup>
                                <FormControl value="May 13, 2024, 11:59 PM" />
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
                <Button variant="secondary"> Cancel</Button>
                <Button variant="danger" className="me-2">
                    Save</Button>
            
                </div>

        </div>
    );
}
