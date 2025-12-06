/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const findQuestionsForQuiz = async (quizId: string | Array<string> | undefined) => {
    const response = await axios
        .get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
};

export const createQuestionForQuiz = async (quizId: string | Array<string>, question: any) => {
    const response = await axios.post(
        `${QUIZZES_API}/${quizId}/questions`,
        question
    );
    return response.data;
};

export const deleteQuestionForQuiz = async (quizId: string, questionId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}/questions/delete`, {
        data: { questionId }
    });
    return response.data;
};

export const updateQuestionForQuiz = async (quizId: string, question: any) => {
    return axios.put(`${QUIZZES_API}/${quizId}/questions/update`, {
        questionId: question._id,
        ...question
    });
};



