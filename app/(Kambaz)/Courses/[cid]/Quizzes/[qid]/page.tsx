/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
    FormLabel,
    Row,
    Col,
    FormCheck,
    FormSelect,
    Button,
    NavItem,
    NavLink, Nav
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { InputGroup } from "react-bootstrap";
import FormControl from "react-bootstrap/esm/FormControl";
import Form from "react-bootstrap/Form";
import { BiCalendar } from "react-icons/bi";
import { useParams } from "next/navigation";
import { formatDateString } from "../../Assignments/FormatDateString";
import Link from "next/link";
import { useSelector } from "react-redux";
import {useEffect, useState} from "react";
import * as client from "../client";
import {useRouter} from "next/navigation";

export default function QuizDetailsEditor() {
    const { cid } = useParams();
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<any>({
        shuffleAnswers: true,
    });
    const router = useRouter();

    async function fetchQuiz() {
        if (!qid) return;
        const fetchedQuiz = await client.findQuizById(qid as string);
        setQuiz(fetchedQuiz);
    }
    useEffect(() => {
        fetchQuiz()
    }, [qid]);


    const availableDateFormatted = formatDateString(quiz?.availableDate);
    const dueDateFormatted = formatDateString(quiz?.dueDate);
    const onUpdateQuiz = async (quiz: any) => {
        const updatedQuiz = await client.updateQuiz(cid as string, quiz);
        setQuiz(updatedQuiz);
    };
    const onCreateQuizForCourse = async () => {
        if (!cid) return;
        const newQuiz = { ...quiz, course: cid };
        const createdQuiz = await client.createQuizForCourse(cid, newQuiz);
        setQuiz(createdQuiz);
    };

    const handleSave = async () => {
        if (quiz._id) {
            const updatedQuiz = await client.updateQuiz(cid as string, quiz);
            setQuiz(updatedQuiz);
        } else {
            const createdQuiz = await client.createQuizForCourse(cid as string, quiz);
            setQuiz(createdQuiz);
        }
    };

    const handleSaveAndRedirect = async () => {
        if (quiz._id) {
            const updatedQuiz = await client.updateQuiz(cid as string, quiz);
            setQuiz(updatedQuiz);
            router.push(`/Courses/${cid}/Quizzes/${updatedQuiz._id}/Details`);
        } else {
            const createdQuiz = await client.createQuizForCourse(cid as string, quiz);
            setQuiz(createdQuiz);
            router.push(`/Courses/${cid}/Quizzes/${createdQuiz._id}/Details`);
        }
    }


    return (
        <div id="wd-quizzes-editor" className='p-2'>
            <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link as={Link} href={`/Courses/${cid}/Quizzes/${qid}`} eventKey="details">
                        Details
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleSave} as={Link} href={`/Courses/${cid}/Quizzes/${qid}/Questions`} eventKey="questions">
                        Questions
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <br/>

            <FormLabel>Quiz Name</FormLabel>
            <FormControl defaultValue={quiz?.title}
                         onChange={(e) => setQuiz({ ...quiz, title: e.target.value }) }/>
            <br />
            <FormControl as="textarea" rows={4} defaultValue={quiz?.description}
                         onChange={(e) => setQuiz({ ...quiz, description: e.target.value }) }>
                {quiz?.description}
            </FormControl>
            <br />
            <Row className="mb-3" id="wd-quiz-type">
                <FormLabel column sm={2}> Quiz Type </FormLabel>
                <Col sm={10}>
                    <FormSelect value={quiz?.quizType} onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value }) }>
                        <option value="Graded Quiz">Graded Quiz</option>
                        <option value={'Practice Quiz'}>Practice Quiz</option>
                        <option value={'Graded Survey'}>Graded Survey</option>
                        <option value={'Ungraded Survey'}>Ungraded Survey</option>
                    </FormSelect>
                </Col>
            </Row>
            <Form>
                <Row className="mb-3" id="wd-points">
                    <FormLabel column sm={2}> Points </FormLabel>
                    <Col sm={10}> <FormControl defaultValue={0}
                                               onChange={(e) => setQuiz({ ...quiz, points: parseInt(e.target.value )}) }/> </Col>
                </Row>
                <Row className="mb-3" controlId="wd-group">
                    <FormLabel column sm={2}> Assignment Group </FormLabel>
                    <Col sm={10}>
                        <FormSelect value={quiz?.assignmentGroup} onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value }) }>
                            <option value="Quizzes">Quizzes</option>
                            <option value="Exams">Exams</option>
                            <option value="Assignments">Assignments</option>
                            <option value={'Project'}>Project</option>
                        </FormSelect>
                    </Col>
                </Row>
                <strong>Options</strong>
                <br/>
                <Form.Check
                    type="checkbox"
                    id="wd-shuffle-answers"
                    label="Shuffle Answers"
                    defaultChecked={true}
                    onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked }) }
                />
                <br/>
                <FormLabel>Time Limit</FormLabel>
                <FormControl style={{ width: "60px" }}  defaultValue={quiz?.timeLimit}
                             onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value }) }/>
                <br/>
                <Form.Check
                    type="checkbox"
                    id="wd-multiple-attempts"
                    label="Allow Multiple Attempts"
                    defaultChecked={false}
                    onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked }) }
                />
                <br/>
                {quiz?.multipleAttempts && (
                    <>
                    <FormLabel>Allowed Attempts</FormLabel>
                    <FormControl style={{ width: "60px" }}  defaultValue={quiz?.allowedAttempts}
                                 onChange={(e) => setQuiz({ ...quiz, allowedAttempts: e.target.value }) }/></>
                )}
                <br/>
                <FormLabel>Show Correct Answers</FormLabel>
                <FormControl style={{ width: "60px" }}  defaultValue={quiz?.showCorrectAnswers}
                             onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value }) }/>
                <br/>
                <FormLabel>Access Code</FormLabel>
                <FormControl style={{ width: "60px" }}  defaultValue={quiz?.accessCode}
                             onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value }) }/>
                <br/>
                <Form.Check
                    type="checkbox"
                    id="wd-one-question-at-a-time"
                    label="One Question at a Time"
                    defaultChecked={true}
                    onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.value }) }
                />
                <br/>
                <Form.Check
                    type="checkbox"
                    id="wd-webcam-required"
                    label="Webcam Required"
                    defaultChecked={false}
                    onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.value }) }
                />
                <br/>
                <Form.Check
                    type="checkbox"
                    id="wd-lock-questions"
                    label="Lock Questions After Answering"
                    defaultChecked={false}
                    onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.value }) }
                />
                <br/>

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
                                             onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value }) }/>
                                <InputGroupText><BiCalendar className="fs-4"/></InputGroupText>
                            </InputGroup>
                            <br/>
                            <Row className="g-3">
                                <Col md={6}>
                                    <FormLabel><strong>Available from</strong></FormLabel>
                                    <InputGroup>
                                        <FormControl
                                            onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value }) }
                                            type='date' defaultValue={availableDateFormatted} />
                                        <InputGroupText>
                                            <BiCalendar className="fs-4" />
                                        </InputGroupText>
                                    </InputGroup>
                                </Col>

                                <Col md={6}>
                                    <FormLabel><strong>Until</strong></FormLabel>
                                    <InputGroup>
                                        <FormControl onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value }) }
                                                     type='date' defaultValue={availableDateFormatted} />
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
                <Button onClick={handleSaveAndRedirect} variant="danger" className="me-2">
                    Save</Button>

                <Link href={`/Courses/${cid}/Quizzes/`}>
                    <Button onClick={handleSave} variant="danger" className="me-2">
                        Save and Publish</Button>
                </Link>
                <Link href={`/Courses/${cid}/Quizzes/`}>
                    <Button variant="secondary">Cancel</Button>
                </Link>


            </div>

        </div>
    );
}
