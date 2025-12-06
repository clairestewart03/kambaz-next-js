/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {useParams} from "next/navigation";
import * as client from "../../client";
import {useEffect, useState} from "react";
import {Button, Col, FormLabel, Row} from "react-bootstrap";
import {FaPencil} from "react-icons/fa6";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { formatDateString } from "../../../Assignments/FormatDateString";
import {useSelector} from "react-redux";
import * as attemptsClient from "../StudentAttempt/client";
import {current} from "immer";
import * as questionsClient from "@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/Questions/client";


export default function QuizDetails() {
    const {qid} = useParams();
    const { cid } = useParams();
    const [quiz, setQuiz] = useState<any>(null);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const [quizzes, setQuizzes] = useState<any>();
    const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
    const [lastAttempt, setLastAttempt] = useState<any>();
    const [questions, setQuestions] = useState<any[]>([]);


    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        setQuizzes(quizzes);
    };

    useEffect(() => {
        if (!quiz || !currentUser?._id) return;
        const loadAttempts = async () => {
            const attempts = await attemptsClient.findAttemptsForQuizForUser(
                qid as string,
                currentUser._id
            );
            const used = attempts.length;

            if (quiz.multipleAttempts) {
                const left = quiz.allowedAttempts - used;
                setAttemptsLeft(left);
            } else {
                const left = used === 0 ? 1 : 0;
                setAttemptsLeft(left);
            }
        };
        loadAttempts();
    }, [quiz, currentUser]);

    async function fetchQuiz() {
        if (!qid) return;
        const fetchedQuiz = await client.findQuizById(qid as string);
        console.log(fetchedQuiz);
        setQuiz(fetchedQuiz);
    }
    useEffect(() => {
        if (!qid || !currentUser?._id) return;
        fetchQuiz();
        fetchQuizzes();
        getLastAttempt();
        fetchQuestions();
    }, [qid, currentUser]);

    const onUpdatePublish = async (quizId: string) => {
        const updatedQuiz = await client.updatePublished(quizId);
        setQuizzes(quizzes.map((q: any) => q._id === quizId ? updatedQuiz : q));
        setQuiz(updatedQuiz);
    }

    const getLastAttempt = async () => {
        const lastAttempt = await attemptsClient.findLastAttempt(qid as string, currentUser._id);
        setLastAttempt(lastAttempt);
    }

    const fetchQuestions = async () => {
        const questions = await questionsClient.findQuestionsForQuiz(qid as string);
        setQuestions(questions);
    };

    const calculateTotalPoints = () => {
        let totalPoints = 0;
        questions.forEach(q => {
            totalPoints += q.points;
        });
        return totalPoints;
    }


    return (
        <div id='wd-quizzes-details'>
            {currentUser.role === "FACULTY" && (<div className='d-flex justify-content-center'>
                <Link href={`/Courses/${cid}/Quizzes/${qid}/Preview`}>
                    <Button className='fs-5 me-2' variant='secondary'>Preview</Button>
                </Link>
                <Link href={`/Courses/${cid}/Quizzes/${qid}/`}>
                    <Button className='fs-5' variant='secondary'>
                        <FaPencil></FaPencil> Edit</Button>
                </Link>
                <Button onClick={() => onUpdatePublish(quiz._id)} className=' ms-2 fs-5'
                    variant={quiz?.published ? 'danger'
                : "success"}>
                    {quiz?.published ? "Unpublish"
                    : "Publish"}</Button>
            </div>)}
            <hr/>
            <h2>{quiz?.title}</h2>
            {lastAttempt
                ? <h4>Recent Score = {lastAttempt.score / calculateTotalPoints() * 100 } %</h4>
                : <h4>No Score Yet</h4>}
            <div id='wd-quiz-details' className="text-end" style={{width: "max-content"}}>
                <Form>
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{minWidth: "220px"}}>
                            <FormLabel><strong>Quiz Type</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            {quiz?.quizType}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                            <FormLabel><strong>Points</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            {quiz?.points}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                            <FormLabel><strong>Assignment Group</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            {quiz?.assignmentGroup}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                            <FormLabel><strong>Shuffle Answers</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            yes
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                            <FormLabel><strong>Time Limit</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            {quiz?.timeLimit}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                            <FormLabel><strong>Multiple Attempts</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            {quiz?.multipleAttempts === true?
                            "Yes" : "No"}
                        </Col>
                    </Row>
                    {quiz?.multipleAttempts === true && (
                        <Row className="mb-2">
                            <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                                <FormLabel><strong>Allowed Attempts</strong></FormLabel>
                            </Col>
                            <Col className="text-start">
                                {quiz?.allowedAttempts}
                            </Col>
                        </Row>
                    )}
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                            <FormLabel><strong>Show Correct Answers</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            {quiz?.showCorrectAnswers}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                            <FormLabel><strong>Access Code</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            {quiz?.accessCode}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                            <FormLabel><strong>One Question at a Time</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            {quiz?.oneQuestionAtATime === true?
                            "Yes" : "No"}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                            <FormLabel><strong>Webcam Required</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            {quiz?.webcamRequired === true?
                            "Yes" : "No"}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4} className="text-end" style={{ minWidth: "220px" }}>
                            <FormLabel><strong>Lock Questions After Answering</strong></FormLabel>
                        </Col>
                        <Col className="text-start">
                            {quiz?.lockQuestionsAfterAnswering === true?
                            "Yes" : "No"}
                        </Col>
                    </Row>
                </Form>
                <Form>
                    <Row className="mb-2 text-nowrap">
                        <Col xs={4} className="text-start">
                            <strong>Due</strong>
                        </Col>
                        <Col xs={4} className="text-start">
                            <strong>Available From</strong>
                        </Col>
                        <Col xs={4} className="text-start">
                            <strong>Until</strong>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="mb-2 text-nowrap">
                        <Col xs={4} className="text-start">
                            {formatDateString(quiz?.dueDate)}
                        </Col>
                        <Col xs={4} className="text-start">
                            {formatDateString(quiz?.availableDate)}
                        </Col>
                        <Col xs={4} className="text-start">
                            {formatDateString(quiz?.untilDate)}
                        </Col>
                    </Row>
                    <hr/>
                </Form>
                <div className={'d-flex justify-content-center'}>
                    {attemptsLeft !== null && attemptsLeft > 0 && currentUser.role === "STUDENT" && (
                        <Link href={`/Courses/${cid}/Quizzes/${qid}/StudentAttempt`}>
                            <Button variant="danger">Start Quiz</Button>
                        </Link>
                    )}
                    {attemptsLeft === 0 && (
                        <p className="text-danger">No attempts left</p>
                    )}
                </div>





            </div>
        </div>

    )


}