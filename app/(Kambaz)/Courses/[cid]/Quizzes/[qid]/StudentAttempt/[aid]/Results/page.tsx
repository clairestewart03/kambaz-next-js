/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import * as questionsClient from "@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/Questions/client";
import * as client from "../../client";
import FormLabel from "react-bootstrap/FormLabel";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import GreenCheckmark from "@/app/(Kambaz)/Courses/[cid]/Modules/GreenCheckmark";
import { HiX } from "react-icons/hi";

export default function QuizResults() {
    const {aid, qid} = useParams();
    const [questions, setQuestions] = useState<any[]>([]);
    const [question, setQuestion] = useState<any>(null);
    const [attempt, setAttempt] = useState<any>();

    const fetchQuestions = async () => {
        const questions = await questionsClient.findQuestionsForQuiz(qid as string);
        setQuestions(questions);
    };

    const fetchAttempt = async () => {
        const attempt = await client.findAttemptById(aid as string);
        console.log("attempt", attempt);
        setAttempt(attempt);
    }

    useEffect(() => {
        fetchAttempt();
        fetchQuestions();
    }, [qid]);

    const calculateTotalPoints = () => {
        let totalPoints = 0;
        questions.forEach(q => {
            totalPoints += q.points;
        });
        return totalPoints;
    }

    const calculateScore = () => {
        const totalPoints = calculateTotalPoints()
        return attempt?.score / totalPoints * 100 + " %";
    }

    const isQuestionCorrect = (question: any) => {
        if (!attempt) return false;

        const ans = attempt.answers.find((a: any) => a.questionId === question._id);
        if (!ans) return false;

        // multiple choice
        if (question.questionType === "multiple-choice") {
            const correctIndex = question.choices.findIndex(
                (c: any) => c.isCorrect === true
            );
            return ans.selectedAnswer === correctIndex;
        }
        // true or false
        if (question.questionType === "true-false") {
            return (
                (question.correctTrueOrFalse && ans.selectedAnswer === 1) ||
                (!question.correctTrueOrFalse && ans.selectedAnswer === 0)
            );
        }
        // fill in the blank
        if (question.questionType === "fill-in-blank") {
            return question.correctText.some(
                (correct: string) =>
                    correct.trim().toLowerCase() ===
                    ans.selectedAnswer.trim().toLowerCase()
            );
        }
        return false;
    };



    return(
        <div id={'wd-quiz-results'}>
            <h1>Quiz Results</h1>
            <h2>Score: {calculateScore()}</h2>
            <div id="wd-multiple-choice" className={'d-flex flex-column align-items-center'}>
                {questions.map((question: any, index: number) => (
                    <>
                    <ListGroup style={{width: "600px"}}>
                        <ListGroupItem key={question._id}>
                    <div key={index} className="mb-4">
                        <div className="d-flex justify-content-between w-100">
                            <FormLabel>
                                <strong>Question: </strong>
                                {isQuestionCorrect(question) ? <GreenCheckmark/>
                                : <HiX className='text-danger fs-4'/>}
                            </FormLabel>
                            <div className="d-flex align-content-center gap-1">
                                <FormLabel>
                                    <strong>Points: </strong>
                                </FormLabel>
                                <span>{question.points}</span>
                            </div>
                        </div>

                        <p>{question.questionText}</p>
                        <FormLabel>
                            {question.questionType === "fill-in-blank" ?
                                <strong>Accepted Answers:</strong>
                                : <strong>Answers:</strong>}
                        </FormLabel>

                        {question.questionType === "multiple-choice" && (
                            <ul>
                                {question.choices.map((choice: any, i: number) => (
                                    <li key={i}>
                                        {choice.text}
                                        {choice.isCorrect && (
                                            <span
                                                className="ms-2 text-success">(Correct Answer)</span>
                                        )}
                                    </li>

                                ))}
                            </ul>
                        )}

                        {question.questionType === "true-false" && (
                            <ul>
                                <li>
                                    True{" "}
                                    {question.correctTrueOrFalse && (
                                        <span className="ms-2 text-success">(Correct Answer)</span>
                                    )}
                                </li>
                                <li>
                                    False{" "}
                                    {!question.correctTrueOrFalse && (
                                        <span className="ms-2 text-success">(Correct Answer)</span>
                                    )}
                                </li>
                            </ul>
                        )}

                        {question.questionType === "fill-in-blank" && (
                            <ul>
                                {question.correctText.map((text: any, i: number) => (
                                    <li key={i}>{text}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                        </ListGroupItem>
                        <br/>
                    </ListGroup>
                    </>

                ))}

            </div>

        </div>


    )
}

