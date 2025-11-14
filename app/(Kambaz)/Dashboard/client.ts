import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
    const response = await axios.post(`${USERS_API}/${userId}/enrollments/enroll/${courseId}`);
    return response.data
};

export const unEnrollUserInCourse = async (userId: string, courseId: string) => {
    const response = await axios.delete(`${USERS_API}/${userId}/enrollments/unenroll/${courseId}`);
    return response.data;
};