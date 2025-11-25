/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
export const deleteAssignment = async (courseId: string, assignmentId: string) => {
    const response = await axios.delete(`/${COURSES_API}/${courseId}/assignments/${assignmentId}`);
    return response.data;
};
export const updateAssignment = async (courseId: string, assignment: any) => {
    const { data } = await axios.put(`${COURSES_API}/${courseId}/assignments/${assignment._id}`, assignment);
    return data;
};
export const createAssignmentForCourse = async (courseId: string | Array<string>, assignment: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
    );
    return response.data;
};
export const findAssignmentsForCourse = async (courseId: string | Array<string> | undefined) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};


