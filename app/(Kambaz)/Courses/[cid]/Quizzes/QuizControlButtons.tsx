/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoEllipsisVertical } from "react-icons/io5";
import {BsBan, BsCheckCircle} from "react-icons/bs";
import {Dropdown} from "react-bootstrap";

import GreenCheckmark from "@/app/(Kambaz)/Courses/[cid]/Assignments/GreenCheckmark";
import Link from "next/link";
import {useParams} from "next/navigation";
import * as client from "./client";

export default function QuizControlButtons({quiz, onDeleteQuiz, onUpdatePublish}: {
    quiz: any, onDeleteQuiz: (quizId: string) => void, onUpdatePublish: (quizId: string) => void;
}) {
    const { cid } = useParams();


    return (
        <div className="float-end d-flex">
            {quiz.published ? (
                <GreenCheckmark/>
            ) : (
                <BsBan className="fs-5 text-secondary me-2" />
            )}
            <Dropdown align="end">
                <Dropdown.Toggle
                    as="span"
                    id={`quiz-${quiz._id}-menu`}
                    style={{ cursor: "pointer" }}
                >
                    <IoEllipsisVertical className="fs-4" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={Link} href={`/Courses/${cid}/Quizzes/${quiz._id}`}>
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onDeleteQuiz(quiz._id)}>Delete</Dropdown.Item>
                    <Dropdown.Item onClick={() => onUpdatePublish(quiz._id)}>
                        {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>

    );
}
