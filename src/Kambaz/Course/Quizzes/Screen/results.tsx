import { useEffect, useState } from "react";
import * as attemptClient from "./client";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

export default function Results() {
  const { aid } = useParams();
  const [attempt, setAttempt] = useState({
    _id: uuidv4(),
    course: "",
    user: "",
    quiz: "",
    answers: [],
  });
  const fetchAttempt = async () => {
    const attempt = await attemptClient.findAttemptById(aid! as string);
    setAttempt(attempt);
    // console.log(attempt);
  };
  useEffect(() => {
    fetchAttempt();
  }, []);
  return (
    <div>
      <h1>Quiz Results</h1>
      <p>Attempt ID: {attempt._id}</p>
      <p>Course ID: {attempt.course}</p>
      <p>User ID: {attempt.user}</p>
      <p>Quiz ID: {attempt.quiz}</p>
      <h2>Your Answers:</h2>
      {attempt &&
        attempt.answers.map((question: any) => (
          <p>Your answer: {question.choice}</p>
        ))}
    </div>
  );
}
