import { useEffect, useState } from "react";
import * as attemptClient from "./client";
import * as quizClient from "../client";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

export default function Results() {
  const { qid, aid } = useParams();
  const [attempt, setAttempt] = useState({
    _id: uuidv4(),
    course: "",
    user: "",
    quiz: "",
    answers: [],
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const fetchQuiz = async () => {
    const questions = await quizClient.findQuestionsForQuiz(qid! as string);
    setQuestions(questions);
  };
  const fetchAttempt = async () => {
    const attempt = await attemptClient.findAttemptById(aid! as string);
    setAttempt(attempt);
    fetchQuiz();
  };
  const getScore = () => {
    if (!questions.length || !attempt.answers.length) return 0;
    let score = 0;
    attempt.answers.forEach((answer: any) => {
      const question = questions.find((q: any) => q._id === answer.questionId);
      if (question && answer.choice === String(question.answer)) {
        score = score + question.points;
      }
    });

    return `${score}/${questions.reduce((total, q) => total + q.points, 0)}`;
  };
  useEffect(() => {
    fetchAttempt();
  }, []);
  return (
    <div>
      <h1>Quiz Results Screen</h1>
      <p>Attempt ID: {attempt._id}</p>
      <p>Course ID: {attempt.course}</p>
      <p>User ID: {attempt.user}</p>
      <p>Quiz ID: {attempt.quiz}</p>
      <h2>Your Answers:</h2>
      {attempt &&
        attempt.answers.map((answer: any) => {
          const question = questions.find(
            (q: any) => q._id === answer.questionId
          );
          return (
            <div key={answer.questionId}>
              <h5>
                {question
                  ? `(${question.points} pts) ${question.title}`
                  : "Question not found"}
              </h5>
              <p>Correct answer: {question?.answer || "Not found"}</p>
              <p>Your answer: {answer.choice}</p>
            </div>
          );
        })}
      <h2>Quiz Results:</h2>
      <p>Score: {getScore()}</p>
    </div>
  );
}
