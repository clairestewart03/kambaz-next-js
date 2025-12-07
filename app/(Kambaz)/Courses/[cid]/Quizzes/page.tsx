/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";
import Link from "next/link";
import {Button, FormControl, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {useParams} from "next/navigation";
import FormatDate from "@/app/(Kambaz)/Courses/[cid]/Assignments/FormatDate";
import {GoTriangleDown} from "react-icons/go";
import {IoEllipsisVertical} from "react-icons/io5";
import QuizControlButtons from "@/app/(Kambaz)/Courses/[cid]/Quizzes/QuizControlButtons";
import {useEffect, useState} from "react";
import * as client from "@/app/(Kambaz)/Courses/[cid]/Quizzes/client";
import {FaRocket} from "react-icons/fa";
import { useSelector } from "react-redux";
import * as attemptClient from "@/app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/StudentAttempt/client";
import {sort} from "next/dist/build/webpack/loaders/css-loader/src/utils";

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const { cid } = useParams();
    const [attemptCounts, setAttemptCounts] = useState<any>({});


    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        setQuizzes(quizzes);
    };

    useEffect(() => {
        if (quizzes.length === 0 || !currentUser?._id) return;
        const loadAttempts = async () => {
            const counts : any = {};
            for (const quiz of quizzes) {
                const attempts = await attemptClient.findAttemptsForQuizForUser(
                    quiz._id,
                    currentUser._id
                );
                counts[quiz._id] = attempts.length;
            }
            setAttemptCounts(counts);
        };
        loadAttempts();
    }, [quizzes, currentUser]);

    const onDeleteQuiz = async (quizId: string) => {
        await client.deleteQuiz(cid as string, quizId);
        setQuizzes(quizzes.filter(q => q._id !== quizId));
    };

    const onUpdatePublish = async (quizId: string) => {
        const updatedQuiz = await client.updatePublished(quizId);
        setQuizzes(quizzes.map(q => q._id === quizId ? updatedQuiz : q));
    }

    useEffect(() => {
        fetchQuizzes();
    }, [cid]);

    const sortedQuizzes = [...quizzes].sort(
        (a : any, b : any) => new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime()
    );



    return (
        <div id="wd-quizzes">
            <div className='d-flex align-items-center justify-content-between'>
                <InputGroup style={{width:"200px"}}>
                    <InputGroupText>
                        <FaMagnifyingGlass />
                    </InputGroupText>
                    <FormControl placeholder="Search For Quiz" id="wd-search-quiz" />
                </InputGroup>
                <div className='gap-1 d-flex'>
                    {currentUser.role === 'FACULTY' && (<Link href={`/Courses/${cid}/Quizzes/New-Quiz`}>
                        <Button variant="danger" id="wd-add-quiz">
                            + Quiz</Button>
                    </Link>)}
                    <Button variant='secondary'><IoEllipsisVertical/> </Button>
                </div>

            </div>
            <br /><br />
            <ListGroup className='rounded-0' id='wd-quizzes'>
                <ListGroupItem className='wd-quiz p-0 fs-5 border-gray'>
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <GoTriangleDown className='me-2'/>
                        Quizzes
                    </div>
                </ListGroupItem>

                <ListGroup id="wd-quiz-list-item" className="rounded-0">
                    <>
                    {sortedQuizzes.map((quiz: any) => (

                        quiz.published && currentUser.role === "STUDENT" && (
                            <ListGroupItem className="wd-quiz-description p-3 ps-1 d-flex">
                                <FaRocket className='fs-5 me-3 ms-2 align-self-center'/>
                                <p id='wd-quiz-description' className='mb-0 small'>
                        <span className='fs-6'>
                            <Link href={`/Courses/${cid}/Quizzes/${quiz._id}/Details`}
                                  className='text-decoration-none text-reset'>
                                <strong>{quiz.title}</strong> <br/></Link></span>
                                    <strong>Closed </strong> | <strong>Due</strong> <FormatDate
                                    rawDate={quiz.dueDate}/> | {quiz.points} pts
                                    | {quiz.numQuestions} Questions</p>
                                <span className='ms-auto d-flex align-items-center'>
                                   {quiz.multipleAttempts &&
                                       attemptCounts[quiz._id] !== undefined &&
                                       attemptCounts[quiz._id] < quiz.allowedAttempts && (
                                           <span> Attempts Left: {quiz.allowedAttempts - attemptCounts[quiz._id]}
                                            </span>
                                       )}
                                </span>
                            </ListGroupItem>)))}

                        {sortedQuizzes.map((quiz: any) => (
                            currentUser.role === "FACULTY" && (
                                <ListGroupItem className="wd-quiz-description p-3 ps-1 d-flex">
                                    <FaRocket className='fs-5 me-3 ms-2 align-self-center'/>
                                <p id='wd-quiz-description' className='mb-0 small'>
                        <span className='fs-6'>
                            <Link href={`/Courses/${cid}/Quizzes/${quiz._id}/Details`}
                                  className='text-decoration-none text-reset'>
                                <strong>{quiz.title}</strong> <br/></Link></span>
                                    <strong>Closed </strong> | <strong>Due</strong> <FormatDate
                                    rawDate={quiz.dueDate}/> | {quiz.points} pts
                                    | {quiz.numQuestions} Questions</p>
                                <div className='ms-auto d-flex align-items-center'>
                                    <QuizControlButtons quiz={quiz} onDeleteQuiz={onDeleteQuiz}
                                                            onUpdatePublish={onUpdatePublish}/>
                                </div>
                            </ListGroupItem>)))}

                    </>
                </ListGroup>

            </ListGroup>
        </div>
    );
}

  