import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};
export const publishQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/publish`
  );
  return data;
};
export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return response.data;
};

export const createQuestionForQuiz = async (quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const createQuestionAndRecalcPoints = async (
  quizId: string,
  question: any
) => {
  const res = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions/points`,
    question
  );
  return res.data;
};

export const recalcQuizPoints = async (quizId: string) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/points`
  );
  return data;
};
export const recalcQuizQuestionNumber = async (quizId: string) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/question-number`
  );
  return data;
};
export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};