import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;

const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;

export const findQuestionById = async (questionId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUESTIONS_API}/${questionId}`
  );
  return data;
};

export const updateQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUESTIONS_API}/${questionId}`
  );
  return data;
};