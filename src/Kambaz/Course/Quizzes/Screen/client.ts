import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
const ATTEMPTS_API = `${HTTP_SERVER}/api/attempts`;

export const findAttemptsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${ATTEMPTS_API}/quiz/${quizId}`
  );
  return response.data;
};
export const addAttempt = async (attempt: any) => {
  const response = await axiosWithCredentials.post(`${ATTEMPTS_API}`, attempt);
  return response.data;
};
export const findAttemptById = async (attemptId: string) => {
  const response = await axiosWithCredentials.get(
    `${ATTEMPTS_API}/${attemptId}`
  );
  return response.data;
};
