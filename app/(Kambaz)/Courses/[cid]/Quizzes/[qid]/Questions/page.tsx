/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {Button, Col, FormSelect, ListGroup, ListGroupItem, Nav} from "react-bootstrap";
import Link from "next/link";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import * as client from "./client";
import {FaRocket, FaTrash} from "react-icons/fa";
import FormatDate from "@/app/(Kambaz)/Courses/[cid]/Assignments/FormatDate";
import QuizControlButtons from "@/app/(Kambaz)/Courses/[cid]/Quizzes/QuizControlButtons";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel"
import Form from "react-bootstrap/Form";
export default function QuestionsEditor() {
    const [questions, setQuestions] = useState<any[]>([]);
    const [question, setQuestion] = useState<any>(null);
    const {cid} = useParams();
    const {qid} = useParams();
    const [editingQuestionId, setEditingQuestionId] = useState<string>("");

    const fetchQuestions = async () => {
        const questions = await client.findQuestionsForQuiz(qid as string);
        setQuestions(questions);
    };

    useEffect(() => {
        fetchQuestions();
    }, [qid]);

    const onCreateQuestionForQuiz = async () => {
        if (!qid) return;
        const newQuestion = {...question, quizId: qid};
        const createdQuestion = await client.createQuestionForQuiz(qid, newQuestion);
        setQuestions([...questions, createdQuestion]);
    };

    const onDeleteQuestion = async (questionId: string) => {
        await client.deleteQuestionForQuiz(qid as string, questionId);
        setQuestions(questions.filter(q => q._id !== questionId));
    };

    const handleSave = async (question: any) => {
        if (question._id) {
            const updatedQuestion = await client.updateQuestionForQuiz(qid as string, question);
            setQuestion(updatedQuestion);
        } else {
            const createdQuestion = await client.createQuestionForQuiz(qid as string, question);
            setQuestion(createdQuestion);
        }
    };

    return (
        <div id={'wd-questions-editor'}>
            <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link as={Link} href={`/Courses/${cid}/Quizzes/${qid}`} eventKey="details">
                        Details
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} href={`/Courses/${cid}/Quizzes/${qid}/Questions/`}
                              eventKey="questions">
                        Questions
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <br/>
            <div className={'d-flex justify-content-center'}>
                <Button onClick={onCreateQuestionForQuiz} variant={'secondary fs-5'}>+ New
                    Question</Button>
            </div>
            <br/>
            <hr/>
            <ListGroup id="wd-quiz-list-item" className="rounded-0">
                {questions.map((question: any) => (
                    <ListGroupItem key={question._id}>
                        {editingQuestionId === question._id && (
                            <div id="wd-editing-question">
                                <FormSelect style={{ width: "200px" }} value={question?.questionType} onChange={(e) =>
                                        setQuestions(questions.map((q) => q._id === question._id ? { ...q, questionType: e.target.value } : q))}>
                                    <option value="multiple-choice">Multiple Choice</option>
                                    <option value="true-false">True or False</option>
                                    <option value="fill-in-blank">Fill in the Blank</option>
                                </FormSelect>
                                <br/>

                                <FormLabel><strong>Points:</strong></FormLabel>
                                <FormControl
                                    style={{ width: "60px" }}
                                    defaultValue={question?.points}
                                    onChange={(e) =>
                                        setQuestions(questions.map((q) => q._id === question._id ? { ...q, points: e.target.value } : q))}/>
                                <br/>

                                <FormLabel><strong>Question:</strong></FormLabel>
                                <FormControl as="textarea" rows={2} value={question.questionText} onChange={(e) =>
                                        setQuestions(questions.map((q) => q._id === question._id ? { ...q, questionText: e.target.value }
                                                    : q))}/>
                                <br/>

                                {question.questionType === "multiple-choice" && (
                                    <>
                                        <FormLabel><strong>Answers:</strong></FormLabel>
                                        {question.choices.map((choice: any, index: number) => (
                                            <div className="mb-2" key={index}>
                                                <div className="d-flex justify-content-between w-100">
                                                    <FormLabel className="me-2">Possible Answer {index + 1}:</FormLabel>
                                                    <Form.Check type="checkbox" label="Select as Correct Answer"
                                                        checked={choice.isCorrect} onChange={(e) =>
                                                            setQuestions(questions.map((q) => q._id === question._id ? {...q,
                                                                            choices: q.choices.map((c : any, i: any) => i === index ? { ...c, isCorrect: e.target.checked } : c),}
                                                                        : q))}/>
                                                    <Button size="sm" variant="danger" onClick={() => setQuestions(questions.map((q) =>
                                                                    q._id === question._id ? { ...q, choices: q.choices.filter((_ : any, i : any) => i !== index) }
                                                                        : q))}><FaTrash/></Button>
                                                </div>
                                                <FormControl as="textarea" rows={2} value={choice.text} onChange={(e) =>
                                                        setQuestions(questions.map((q) => q._id === question._id ? {
                                                                        ...q, choices: q.choices.map((c : any, i : any) =>
                                                                            i === index ? { ...c, text: e.target.value } : c),} : q))}/>
                                            </div>
                                        ))}
                                        <Button size="sm" variant="secondary" className="me-2" onClick={() =>
                                                setQuestions(
                                                    questions.map((q : any) => q._id === question._id
                                                            ? { ...q, choices: [...q.choices, { text: "", isCorrect: false }] } : q))}>+ Add Answer
                                        </Button><br/>
                                    </>
                                )}
                                {question.questionType === "true-false" && (
                                    <>
                                        <FormLabel><strong>Answers:</strong></FormLabel>
                                        <Form.Check
                                            type="radio"
                                            label="True"
                                            checked={question.correctTrueOrFalse === true}
                                            onChange={() =>
                                                setQuestions(questions.map((q : any) =>
                                                        q._id === question._id ? { ...q, correctTrueOrFalse: true } : q))}/>
                                        <Form.Check
                                            type="radio"
                                            label="False"
                                            checked={question.correctTrueOrFalse === false}
                                            onChange={() =>
                                                setQuestions(
                                                    questions.map((q : any) =>
                                                        q._id === question._id
                                                            ? { ...q, correctTrueOrFalse: false }
                                                            : q))}/></>
                                )}

                                {question.questionType === "fill-in-blank" && question.correctText && (
                                    <>
                                        {question.correctText.map((text: string, index: number) => (
                                            <div className="mb-2" key={index}>
                                                <div className="d-flex justify-content-between w-100">
                                                    <FormLabel className="me-2">Possible Answer {index + 1}:</FormLabel>
                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() =>
                                                            setQuestions(
                                                                questions.map((q : any) =>
                                                                    q._id === question._id
                                                                        ? { ...q, correctText: q.correctText.filter((_ : any, i : any) => i !== index) }
                                                                        : q))}><FaTrash></FaTrash></Button>
                                                </div>
                                                <FormControl
                                                    as="textarea"
                                                    rows={2}
                                                    value={text}
                                                    onChange={(e) => setQuestions(questions.map((q : any) => q._id === question._id ? {
                                                                        ...q, correctText: q.correctText.map((t : any, i : any) =>
                                                                            i === index ? e.target.value : t),} : q))}/>
                                            </div>
                                        ))}

                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => setQuestions(questions.map((q : any) => q._id === question._id
                                                            ? { ...q, correctText: [...(q.correctText || []), ""] }
                                                            : q))}>+ Add Answer</Button><br/>
                                    </>
                                )}

                                <br/>
                                <Button onClick={() => setEditingQuestionId("")} className="me-2" variant="secondary">Cancel</Button>
                                <Button
                                    onClick={() => { setEditingQuestionId(""); handleSave(question); }}
                                    className="me-2"
                                >
                                    Update Question
                                </Button>
                                <Button onClick={() => onDeleteQuestion(question._id)} variant="danger">Delete Question</Button>
                            </div>
                        )}

                        {editingQuestionId !== question._id && (
                            <>
                            <div id="wd-multiple-choice">
                                <div className={'d-flex justify-content-between w-100'}>
                                    <FormLabel><strong>Question:</strong>
                                        {question.questionType === 'multiple-choice' ?
                                        " Multiple Choice"
                                    : question.questionType === 'true-false' ?
                                        " True or False"
                                        : " Fill in the Blank"}</FormLabel>
                                    <div className={'d-flex align-content-center gap-1'}>
                                    <FormLabel><strong>Points: </strong></FormLabel>
                                        <span> {question.points}</span>
                                    </div>
                                </div>

                                <p>{question.questionText}</p>
                                <FormLabel><strong>Answers:</strong></FormLabel>
                                {question.questionType === "multiple-choice" && (
                                <ul>
                                    {question.choices.map((choice: any, index: number) => (
                                        <li key={index}> {choice.text}
                                            {choice.isCorrect && (
                                                <span className="ms-2 text-success">(Correct Answer)</span>
                                            )}</li>
                                    ))}
                                </ul>
                                    )}

                                {question.questionType === "true-false" && (
                                    <ul>
                                        <li>
                                            True {question.correctTrueOrFalse && (
                                            <span className="ms-2 text-success">(Correct Answer)</span>
                                        )}
                                        </li>
                                        <li>
                                            False {!question.correctTrueOrFalse && (
                                            <span className="ms-2 text-success">(Correct Answer)</span>
                                        )}
                                        </li>
                                    </ul>
                                )}

                                {question.questionType === "fill-in-blank" && (
                                    <ul>
                                        {question.correctText.map((correctText: any, index: number) => (
                                            <li key={index}> {correctText}</li>
                                        ))}
                                    </ul>
                                )}



                                    <Button onClick={() => setEditingQuestionId(question._id)}
                                size='sm' variant={'danger'}>Edit
                            </Button>
                            </div>
                            </>
                            )}


                    </ListGroupItem>
                    ))}
            </ListGroup>
        </div>
    );
}