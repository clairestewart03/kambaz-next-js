/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import FormControl from "react-bootstrap/FormControl";
import { useState } from "react";
import Link from "next/link";
import * as db from "../Database";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { enrollCourse, unenrollCourse } from "./reducer";
export default function Dashboard() {
    const { currentUser } = useSelector((state: any ) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const dispatch = useDispatch();
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        img: "/images/reactjs.png", description: "New Description"
      });

    const [showAllCourses, setShowAllCourses] = useState(false);
    if (!currentUser) return <div>Loading...</div>;

    const displayedCourses = showAllCourses
        ? courses 
        : courses.filter((course: any) =>
            enrollments.some(
        (e: any) => e.user === currentUser._id && e.course === course._id
      )
    );
    const isEnrolled = (courseId: string) => {
        return enrollments.some(
          (e: any) => e.user === currentUser._id && e.course === courseId
        );
    };
      
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard
            <button 
                onClick={() => setShowAllCourses(!showAllCourses)}
                className="btn btn-success float-end me-2"
                id="wd-enrollments">
                    {showAllCourses ? "My Courses" : "Enrollments"}
                     </button></h1>
             <hr />
            <h5>New Course
                <button className='btn btn-primary float-end' id='wd-add-new-course-click'
                onClick={() => dispatch(addNewCourse(course))}> Add </button>
                <button className="btn btn-warning float-end me-2"
                onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
                    Update </button>
                </h5><br />
                <FormControl value={course.name} className='mb-2'
                onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
                <FormControl as="textarea" value={course.description} rows={3} 
                onChange={(e) => setCourse({ ...course, description: e.target.value }) }/> <hr />
            <h2 id="wd-dashboard-published">Published Courses ({enrollments.filter((e: any) => e.user === currentUser._id).length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {displayedCourses.map((course: any) => (
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link href={`/Courses/${course._id}/Home`}
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src={course.img} width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                {course.name}
                            </CardTitle>
                            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                            {course.description}</CardText>
                        <Button variant="primary">Go</Button>
                        <button onClick={(event) => {
                                event.preventDefault();
                                dispatch(deleteCourse(course._id));
                                }} className="btn btn-danger float-end"
                                id="wd-delete-course-click">
                                Delete
                        </button>
                        <button id="wd-edit-course-click"
                            onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end" >
                            Edit
                        </button>

                        </CardBody>
                        </Link>
                        <Card.Body>
                        {showAllCourses && (
                            <Button
                            variant={isEnrolled(course._id) ? "danger" : "success"}
                            onClick={() => {
                                if (isEnrolled(course._id)) {
                                    dispatch(unenrollCourse({userId: currentUser._id, courseId: course._id}));
                                } else {
                                    dispatch(enrollCourse({userId: currentUser._id, courseId: course._id}));
                                }
                                    }}>
                                {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                            
                            </Button>
                        )}
                        </Card.Body>
                        </Card>
                    </Col>
                    
                ))}
                </Row>
            
            </div>
        </div>
    );
}
