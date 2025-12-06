/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {USERS_API} from "@/app/(Kambaz)/Account/client";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export async function findAttemptById(id: string) {
    const response = await axios.get(`${QUIZZES_API}/attempts/${id}`);
    return response.data;

}

export const createAttemptForQuiz = async (attempt: any, quizId: string, userId: string) => {
    const response = await axios.post(
        `${QUIZZES_API}/${quizId}/attempt/${userId}`,
        attempt
    );
    return response.data;
};

export const findAttemptsForQuizForUser = async (quizId: string, userId: string) => {
    const response = await axios.get(
        `${QUIZZES_API}/${quizId}/attempts/${userId}`)
    return response.data;
}

export const findLastAttempt = async (quizId: string, userId: string) => {
    const response = await
        axios.get(`${QUIZZES_API}/${quizId}/attempts/${userId}/last`)
    return response.data;
}




