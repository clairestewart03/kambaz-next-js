/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import * as quizzesClient from "@/app/(Kambaz)/Courses/[cid]/Quizzes/client";
import FormLabel from "react-bootstrap/FormLabel";
import * as questionsClient from "../Questions/client";
import {Button, FormSelect, ListGroup, ListGroupItem} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import {FaTrash} from "react-icons/fa";
import {FiFlag} from "react-icons/fi";
import * as client from "./client";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {current} from "immer";

export default function StudentAttempt() {
    const { qid, cid} = useParams();
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const router = useRouter();

    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const [attempt, setAttempt] = useState<any>({
        quizId: qid,
        userId: currentUser?._id,
        answers: [],
        score: 0,
        attemptNumber: 0
    });
    const fetchQuestions = async () => {
        const questions = await questionsClient.findQuestionsForQuiz(qid as string);
        setQuestions(questions);
    };
    const calculateScore = () => {
        let score = 0;
        attempt.answers.forEach((ans : any) => {
            const q = questions.find((qq : any) => qq._id === ans.questionId);
            if (!q) return;

            // multiple-choice
            if (q.questionType === "multiple-choice") {
                    const correctIndex = q.choices.findIndex(
                        (choice: any) => choice.isCorrect === true
                    );
                    if (correctIndex === ans.selectedAnswer) {
                        score = score + q.points;
                    }
            }
            // true false
            if (q.questionType === "true-false" && q.correctTrueOrFalse
                && ans.selectedAnswer === 1) {
                score = score + q.points
            }
            if (q.questionType === "true-false" && !q.correctTrueOrFalse
                && ans.selectedAnswer === 0) {
                score = score + q.points;
            }
            // fill in the blank
            if (q.questionType === "fill-in-blank" && q.correctText.some(
                    (correct: string) =>
                        correct.trim().toLowerCase() === ans.selectedAnswer.trim().toLowerCase())) {
                score = score + q.points;
            }

        });
        return score;
    }


    const handleAnswerChange = (questionId: string, selectedIndex: number) => {
        setAttempt((prev: any) => {
            const existingAnswerIndex = prev.answers.findIndex((a: any) => a.questionId === questionId);
            if (existingAnswerIndex !== -1) {
                prev.answers[existingAnswerIndex].selectedAnswer = selectedIndex;
            } else {
                prev.answers.push({ questionId, selectedAnswer: selectedIndex });
            }
            return { ...prev };
        });
    };
    const handleTextAnswerChange = (questionId: string, value: string) => {
        setAttempt((prev: any) => {
            const existingAnswerIndex = prev.answers.findIndex((a: any) => a.questionId === questionId);
            if (existingAnswerIndex !== -1) {
                prev.answers[existingAnswerIndex].selectedAnswer = value;
            } else {
                prev.answers.push({ questionId, selectedAnswer: value });
            }
            return { ...prev };
        });
    };

    const getAttemptNumber = async () => {
        const currentAttemptNumber = 1;
        const pastAttempts = await client.findAttemptsForQuizForUser(qid as string, currentUser._id);
        return currentAttemptNumber + pastAttempts.length;
    }

    const onSubmitQuiz = async () => {
        const newAttemptNumber = await getAttemptNumber();
        const score = calculateScore();
        const attemptWithScore = {
            ...attempt,
            score: score,
            attemptNumber: newAttemptNumber
        };
        const createdAttempt = await client.createAttemptForQuiz(attemptWithScore, qid as string, currentUser._id);
        await router.push(`StudentAttempt/${createdAttempt._id}/Results`)
    };




    async function fetchQuiz() {
        if (!qid) return;
        const fetchedQuiz = await quizzesClient.findQuizById(qid as string);
        setQuiz(fetchedQuiz);
    }
    useEffect(() => {
        fetchQuiz();
        fetchQuestions();
    }, [qid]);


    return (
        <div id={'wd-student-attempt'}>

        <h1>{quiz?.title}</h1>
            <br/>
            <hr/>
            <br/>
            <div className="d-flex flex-column align-items-center" id={'wd-quiz-questions'}>


                {questions.map((question: any, index: number) => (
                    <>
                        <div className={'d-flex gap-3'}>
                            <FiFlag className={'fs-5'}/>
                            <ListGroup style={{width: "600px"}}>
                                <ListGroupItem key={question._id}>
                                    <>
                                        <div id="wd-multiple-choice">
                                            <div className={'d-flex justify-content-between w-100'}>
                                                <h5><strong>Question: {index + 1}</strong>
                                                </h5>
                                                <div
                                                    className={'d-flex align-content-center gap-1'}>
                                                    <span> {question.points}</span>
                                                    <FormLabel>pts</FormLabel>
                                                </div>
                                            </div>
                                            <hr/>
                                            <p>{question.questionText}</p>
                                            <hr/>
                                            {question.questionType === "multiple-choice" && (
                                                <div>
                                                    {question.choices.map((choice: any, index: number) => (
                                                        <>
                                                            <Form.Check
                                                                type="radio"
                                                                name={question._id}
                                                                label={choice.text}
                                                                value={choice.text}
                                                                onChange={() => handleAnswerChange(question._id, index)}/>
                                                            <hr/>
                                                        </>

                                                    ))}
                                                </div>
                                            )}

                                            {question.questionType === "true-false" && (
                                                <>
                                                    <Form.Check
                                                        type="radio"
                                                        label="True"
                                                        name={question._id}
                                                        onChange={() => handleAnswerChange(question._id, 1)}/>
                                                    <hr/>
                                                    <Form.Check
                                                        type="radio"
                                                        label="False"
                                                        name={question._id}
                                                        onChange={() => handleAnswerChange(question._id, 0)}/></>
                                            )}

                                            {question.questionType === "fill-in-blank" && (
                                                <>
                                                    <FormControl as="textarea" rows={3}
                                                                 onChange={(e) => handleTextAnswerChange(question._id, e.target.value)}/>
                                                    <br/>
                                                </>
                                            )}

                                        </div>
                                    </>


                                </ListGroupItem>
                                <br/>
                            </ListGroup>
                        </div>
                    </>
                ))}
                <Button onClick={() => onSubmitQuiz()} variant="secondary">Submit Quiz</Button>
        </div>
</div>
)
    ;
}